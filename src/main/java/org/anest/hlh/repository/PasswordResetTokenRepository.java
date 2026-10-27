package org.anest.hlh.repository;

import org.anest.hlh.entity.PasswordResetToken;
import org.anest.hlh.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    void deleteAllByUser(User user);

    void deleteByExpiresAtBefore(LocalDateTime time);
}
