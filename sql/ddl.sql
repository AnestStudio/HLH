DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS user_detail;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;

create table role (
    id        bigint auto_increment primary key,
    role_name varchar(20) CHARACTER SET utf8mb4 not null unique
);

create table user (
    id                      bigint auto_increment primary key,
    username                varchar(50) CHARACTER SET utf8mb4 unique not null,
    password                varchar(255) CHARACTER SET utf8mb4 not null,
    email                   varchar(255) CHARACTER SET utf8mb4 unique not null,
    full_name               varchar(100) CHARACTER SET utf8mb4 null,
    enabled                 tinyint(1) default 1 not null,
    account_non_expired     tinyint(1) default 1 not null,
    account_non_locked      tinyint(1) default 1 not null,
    credentials_non_expired tinyint(1) default 1 not null,
    created_at              datetime default CURRENT_TIMESTAMP not null,
    updated_at              datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
);

create table user_detail (
    id      bigint auto_increment primary key,
    user_id bigint unique not null,
    mobile  varchar(20) CHARACTER SET utf8mb4 null,
    gender  varchar(10) CHARACTER SET utf8mb4 null,
    bod     date null,
    address varchar(500) CHARACTER SET utf8mb4 null,
    foreign key (user_id) references user(id)
);

create table user_role (
    user_id bigint not null,
    role_id bigint not null,
    primary key (user_id, role_id),
    foreign key (user_id) references user(id),
    foreign key (role_id) references role(id)
);