CREATE TABLE role (
    id        BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL UNIQUE
);

CREATE TABLE user (
    id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
    username                VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE NOT NULL,
    password                VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
    email                   VARCHAR(255) CHARACTER SET utf8mb4 UNIQUE NOT NULL,
    full_name               VARCHAR(100) CHARACTER SET utf8mb4 NULL,
    enabled                 TINYINT(1) DEFAULT 1 NOT NULL,
    account_non_expired     TINYINT(1) DEFAULT 1 NOT NULL,
    account_non_locked      TINYINT(1) DEFAULT 1 NOT NULL,
    credentials_non_expired TINYINT(1) DEFAULT 1 NOT NULL,
    created_at              DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_detail (
    id      BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL,
    mobile  VARCHAR(20) CHARACTER SET utf8mb4 NULL,
    gender  VARCHAR(10) CHARACTER SET utf8mb4 NULL,
    bod     DATE NULL,
    address VARCHAR(500) CHARACTER SET utf8mb4 NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE user_role (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

CREATE TABLE password_reset_token (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    token_hash CHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    used_at    DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
