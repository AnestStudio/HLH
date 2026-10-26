package org.anest.hlh.service.impl;

import lombok.RequiredArgsConstructor;
import org.anest.hlh.entity.AuthUser;
import org.anest.hlh.entity.User;
import org.anest.hlh.repository.UserRepository;
import org.anest.hlh.service.LoginAttemptService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final LoginAttemptService loginAttemptService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng: " + username));

        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .filter(role -> role.getRoleName() != null && !role.getRoleName().isBlank())
                .map(role -> {
                    String roleName = role.getRoleName().trim().toUpperCase();
                    if (!roleName.startsWith("ROLE_")) {
                        roleName = "ROLE_" + roleName;
                    }
                    return new SimpleGrantedAuthority(roleName);
                })
                .collect(Collectors.toList());

        boolean isNonLocked = Boolean.TRUE.equals(user.getAccountNonLocked())
                && !loginAttemptService.isBlocked(user.getUsername());

        return new AuthUser(
                user.getUsername(),
                user.getPassword(),
                Boolean.TRUE.equals(user.getEnabled()),
                Boolean.TRUE.equals(user.getAccountNonExpired()),
                Boolean.TRUE.equals(user.getCredentialsNonExpired()),
                isNonLocked,
                authorities,
                user.getId(),
                user.getEmail(),
                user.getFullName()
        );
    }
}
