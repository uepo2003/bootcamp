CREATE TABLE users (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    PASSWORD char(20) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    registered_at datetime NOT NULL
);

CREATE TABLE settings (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint NOT NULL UNIQUE,
    is_send_email boolean NOT NULL DEFAULT false,
    is_send_push_notification boolean NOT NULL DEFAULT false,
    CONSTRAINT fk_settings_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE posts (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint NOT NULL,
    content text NOT NULL,
    posted_at datetime NOT NULL,
    CONSTRAINT fk_posts_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE likes (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint NOT NULL,
    post_id bigint NOT NULL,
    CONSTRAINT fk_likes_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_likes_post_id FOREIGN KEY (post_id) REFERENCES posts(id),
    UNIQUE KEY uk_likes_user_id_post_id (user_id, post_id)
);

CREATE TABLE comments (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint NOT NULL,
    post_id bigint NOT NULL,
    content text NOT NULL,
    commented_at datetime NOT NULL,
    CONSTRAINT fk_comments_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_comments_post_id FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE follows (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    following_id bigint NOT NULL,
    follower_id bigint NOT NULL,
    CONSTRAINT fk_follows_follwing_id FOREIGN KEY (following_id) REFERENCES users(id),
    CONSTRAINT fk_follows_follower_id FOREIGN KEY (follower_id) REFERENCES users(id),
    UNIQUE KEY uk_following_id_follower_id (following_id, follower_id)
);

CREATE TABLE tags (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    name varchar(140) NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    post_id bigint NOT NULL,
    tag_id bigint NOT NULL,
    CONSTRAINT fk_post_tags_post_id FOREIGN KEY (post_id) REFERENCES posts(id),
    CONSTRAINT fk_post_tags_tag_id FOREIGN KEY (tag_id) REFERENCES tags(id)
);
