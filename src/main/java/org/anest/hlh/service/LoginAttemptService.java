package org.anest.hlh.service;

import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginAttemptService {

    public static final int MAX_ATTEMPTS = 5;
    public static final long LOCK_DURATION_MINUTES = 15;

    private static final Duration LOCK_DURATION = Duration.ofMinutes(LOCK_DURATION_MINUTES);

    /**
     * @param count       number of consecutive failed attempts
     * @param lastAttempt time of the last counted failed attempt
     * @param lockedUntil end of the lock period, {@code null} if the account is not locked
     */
    private record Attempt(int count, Instant lastAttempt, Instant lockedUntil) {

        boolean isLocked(Instant now) {
            return lockedUntil != null && now.isBefore(lockedUntil);
        }

        boolean isExpired(Instant now) {
            if (lockedUntil != null) {
                return !now.isBefore(lockedUntil);
            }
            return lastAttempt.plus(LOCK_DURATION).isBefore(now);
        }
    }

    private final Map<String, Attempt> attemptsCache = new ConcurrentHashMap<>();
    private final Clock clock;

    public LoginAttemptService() {
        this(Clock.systemUTC());
    }

    LoginAttemptService(Clock clock) {
        this.clock = clock;
    }

    public void loginFailed(String username) {
        if (username == null || username.isBlank()) {
            return;
        }
        attemptsCache.compute(normalize(username), (k, attempt) -> {
            Instant now = clock.instant();
            if (attempt == null || attempt.isExpired(now)) {
                return newAttempt(1, now);
            }
            if (attempt.isLocked(now)) {
                // Already locked: do not count and do not extend the lock period
                return attempt;
            }
            return newAttempt(attempt.count() + 1, now);
        });
    }

    public void loginSucceeded(String username) {
        if (username == null || username.isBlank()) {
            return;
        }
        attemptsCache.remove(normalize(username));
    }

    public boolean isBlocked(String username) {
        if (username == null || username.isBlank()) {
            return false;
        }
        String key = normalize(username);
        Attempt attempt = attemptsCache.get(key);
        if (attempt == null) {
            return false;
        }
        Instant now = clock.instant();
        if (attempt.isExpired(now)) {
            attemptsCache.remove(key, attempt);
            return false;
        }
        return attempt.isLocked(now);
    }

    public int getFailedAttempts(String username) {
        if (username == null || username.isBlank()) {
            return 0;
        }
        Attempt attempt = attemptsCache.get(normalize(username));
        if (attempt == null || attempt.isExpired(clock.instant())) {
            return 0;
        }
        return attempt.count();
    }

    public long getRemainingLockMinutes(String username) {
        if (username == null || username.isBlank()) {
            return 0;
        }
        Attempt attempt = attemptsCache.get(normalize(username));
        Instant now = clock.instant();
        if (attempt == null || !attempt.isLocked(now)) {
            return 0;
        }
        long remainingSeconds = Duration.between(now, attempt.lockedUntil()).toSeconds();
        return remainingSeconds > 0 ? (remainingSeconds + 59) / 60 : 0;
    }

    private static Attempt newAttempt(int count, Instant now) {
        Instant lockedUntil = count >= MAX_ATTEMPTS ? now.plus(LOCK_DURATION) : null;
        return new Attempt(count, now, lockedUntil);
    }

    private static String normalize(String username) {
        return username.trim().toLowerCase();
    }
}
