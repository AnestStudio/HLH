package org.anest.hlh.configuration;

import lombok.RequiredArgsConstructor;
import org.anest.hlh.service.LoginAttemptService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final LoginAttemptService loginAttemptService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/css/**", "/js/**", "/images/**", "/vendor/**", "/fonts/**", "/favicon.ico").permitAll()
                .requestMatchers("/", "/login", "/register", "/forgot-password", "/about").permitAll()
                .requestMatchers("/admin/**").hasAnyRole("ADMIN")
                .requestMatchers("/employee/**").hasAnyRole("EMPLOYEE", "ADMIN")
                .anyRequest().authenticated()
            )

            // Form Login
            .formLogin(form -> form
                .loginPage("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .loginProcessingUrl("/login")
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler())
                .permitAll()
            )

            // Logout
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            );

        return http.build();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            String username = request.getParameter("username");
            boolean locked = exception instanceof LockedException;
            if (!locked) {
                locked = loginAttemptService.loginFailed(username);
            }
            if (locked) {
                response.sendRedirect(request.getContextPath() + "/login?locked=true");
            } else {
                response.sendRedirect(request.getContextPath() + "/login?error=true");
            }
        };
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        SavedRequestAwareAuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
        successHandler.setDefaultTargetUrl("/home");
        return (request, response, authentication) -> {
            String username = authentication.getName();
            loginAttemptService.loginSucceeded(username);
            successHandler.onAuthenticationSuccess(request, response, authentication);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
