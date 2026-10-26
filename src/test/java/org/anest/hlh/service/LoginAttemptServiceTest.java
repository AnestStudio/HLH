package org.anest.hlh.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;

class LoginAttemptServiceTest {

    private MutableClock clock;
    private LoginAttemptService loginAttemptService;

    @BeforeEach
    void setUp() {
        clock = new MutableClock(Instant.parse("2026-01-01T00:00:00Z"));
        loginAttemptService = new LoginAttemptService(clock);
    }

    private void lock(String username) {
        for (int i = 0; i < LoginAttemptService.MAX_ATTEMPTS; i++) {
            loginAttemptService.loginFailed(username);
        }
    }

    @Test
    @DisplayName("Should not be blocked initially")
    void shouldNotBeBlockedInitially() {
        assertThat(loginAttemptService.isBlocked("testuser")).isFalse();
        assertThat(loginAttemptService.getFailedAttempts("testuser")).isZero();
    }

    @Test
    @DisplayName("Should track failed attempts accurately")
    void shouldTrackFailedAttempts() {
        String username = "testuser";

        loginAttemptService.loginFailed(username);
        loginAttemptService.loginFailed(username);
        loginAttemptService.loginFailed(username);

        assertThat(loginAttemptService.getFailedAttempts(username)).isEqualTo(3);
        assertThat(loginAttemptService.isBlocked(username)).isFalse();
    }

    @Test
    @DisplayName("Should report when a failed attempt starts or continues a lock")
    void shouldReportLockStatusFromFailedAttempt() {
        String username = "testuser";

        for (int i = 1; i < LoginAttemptService.MAX_ATTEMPTS; i++) {
            assertThat(loginAttemptService.loginFailed(username)).isFalse();
        }

        assertThat(loginAttemptService.loginFailed(username)).isTrue();
        assertThat(loginAttemptService.loginFailed(username)).isTrue();
    }

    @Test
    @DisplayName("Should block user after 5 failed attempts")
    void shouldBlockUserAfterReachingMaxAttempts() {
        String username = "testuser";

        for (int i = 0; i < LoginAttemptService.MAX_ATTEMPTS; i++) {
            loginAttemptService.loginFailed(username);
        }

        assertThat(loginAttemptService.isBlocked(username)).isTrue();
        assertThat(loginAttemptService.getRemainingLockMinutes(username)).isGreaterThan(0);
    }

    @Test
    @DisplayName("Should reset attempts when login succeeds")
    void shouldResetAttemptsOnSuccess() {
        String username = "testuser";

        loginAttemptService.loginFailed(username);
        loginAttemptService.loginFailed(username);
        loginAttemptService.loginSucceeded(username);

        assertThat(loginAttemptService.getFailedAttempts(username)).isZero();
        assertThat(loginAttemptService.isBlocked(username)).isFalse();
    }

    @Test
    @DisplayName("Should handle case-insensitivity and null/blank safely")
    void shouldHandleCaseInsensitivityAndBlankSafely() {
        loginAttemptService.loginFailed("TestUser");
        assertThat(loginAttemptService.getFailedAttempts("testuser")).isEqualTo(1);

        loginAttemptService.loginFailed(null);
        loginAttemptService.loginFailed("");
        loginAttemptService.loginFailed("   ");

        assertThat(loginAttemptService.getFailedAttempts("testuser")).isEqualTo(1);
        assertThat(loginAttemptService.isBlocked(null)).isFalse();
        assertThat(loginAttemptService.isBlocked("")).isFalse();
    }

    @Test
    @DisplayName("Should unlock exactly when lock duration has passed since lock started")
    void shouldUnlockAfterLockDuration() {
        String username = "testuser";
        lock(username);

        clock.advance(Duration.ofMinutes(LoginAttemptService.LOCK_DURATION_MINUTES).minusSeconds(1));
        assertThat(loginAttemptService.isBlocked(username)).isTrue();
        assertThat(loginAttemptService.getRemainingLockMinutes(username)).isEqualTo(1);

        clock.advance(Duration.ofSeconds(1));
        assertThat(loginAttemptService.isBlocked(username)).isFalse();
        assertThat(loginAttemptService.getFailedAttempts(username)).isZero();
        assertThat(loginAttemptService.getRemainingLockMinutes(username)).isZero();
    }

    @Test
    @DisplayName("Failed attempts while locked should not extend the lock")
    void failedAttemptsWhileLockedShouldNotExtendLock() {
        String username = "testuser";
        lock(username);

        for (int i = 0; i < 14; i++) {
            clock.advance(Duration.ofMinutes(1));
            loginAttemptService.loginFailed(username);
        }
        assertThat(loginAttemptService.isBlocked(username)).isTrue();
        assertThat(loginAttemptService.getFailedAttempts(username)).isEqualTo(LoginAttemptService.MAX_ATTEMPTS);

        clock.advance(Duration.ofMinutes(1));
        assertThat(loginAttemptService.isBlocked(username)).isFalse();
    }

    @Test
    @DisplayName("Counting should restart from 1 after the lock expires")
    void shouldRestartCountingAfterLockExpires() {
        String username = "testuser";
        lock(username);

        clock.advance(Duration.ofMinutes(LoginAttemptService.LOCK_DURATION_MINUTES));
        loginAttemptService.loginFailed(username);

        assertThat(loginAttemptService.isBlocked(username)).isFalse();
        assertThat(loginAttemptService.getFailedAttempts(username)).isEqualTo(1);
    }

    @Test
    @DisplayName("Expired attempts should be evicted from the cache")
    void shouldEvictExpiredAttempts() {
        loginAttemptService.loginFailed("expired-user");
        assertThat(loginAttemptService.estimatedTrackedUsernames()).isEqualTo(1);

        clock.advance(Duration.ofMinutes(LoginAttemptService.LOCK_DURATION_MINUTES));
        loginAttemptService.cleanUpExpiredAttempts();

        assertThat(loginAttemptService.estimatedTrackedUsernames()).isZero();
    }

    @Test
    @DisplayName("Cache size should remain bounded after many unique usernames")
    void shouldBoundCacheSizeAfterUsernameFlood() {
        for (int i = 0; i < LoginAttemptService.MAX_TRACKED_USERNAMES + 1_000; i++) {
            loginAttemptService.loginFailed("random-user-" + i);
        }
        loginAttemptService.cleanUpExpiredAttempts();

        assertThat(loginAttemptService.estimatedTrackedUsernames())
            .isLessThanOrEqualTo(LoginAttemptService.MAX_TRACKED_USERNAMES);
    }

    private static final class MutableClock extends Clock {
        private Instant now;

        MutableClock(Instant start) {
            this.now = start;
        }

        void advance(Duration duration) {
            now = now.plus(duration);
        }

        @Override
        public ZoneId getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(ZoneId zone) {
            return this;
        }

        @Override
        public Instant instant() {
            return now;
        }
    }
}
