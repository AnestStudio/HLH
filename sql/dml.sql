
INSERT INTO KS.role (id, role_name) VALUES (1, 'ROLE_ADMIN');

INSERT INTO KS.user (id, username, password, email, full_name, enabled, account_non_expired, account_non_locked, credentials_non_expired, created_at, updated_at) VALUES (1, 'anhdt', '$2a$10$a3GRu888YepxpOJt0Wc9c.GHioaBN8qk0x7UFGEHc7vsDP9DLNIbe', 'anhdt@gmail.com', 'Đinh Tuấn Anh', 1, 1, 1, 1, '2026-10-21 16:50:13', '2026-10-21 16:50:13');

INSERT INTO KS.user_role (id, user_id, role_id) VALUES (1, 1, 1);



