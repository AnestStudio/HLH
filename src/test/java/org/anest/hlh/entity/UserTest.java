package org.anest.hlh.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {

    @Test
    @DisplayName("Builder should set both sides of the user detail relationship")
    void builderShouldSetBothSidesOfUserDetailRelationship() {
        UserDetail userDetail = new UserDetail();

        User user = User.builder()
            .userDetail(userDetail)
            .build();

        assertThat(user.getUserDetail()).isSameAs(userDetail);
        assertThat(userDetail.getUser()).isSameAs(user);
    }

    @Test
    @DisplayName("Builder should preserve the defaults for account status and roles")
    void builderShouldPreserveDefaults() {
        User user = User.builder().build();

        assertThat(user.getEnabled()).isTrue();
        assertThat(user.getAccountNonExpired()).isTrue();
        assertThat(user.getAccountNonLocked()).isTrue();
        assertThat(user.getCredentialsNonExpired()).isTrue();
        assertThat(user.getRoles()).isNotNull().isEmpty();
    }
}