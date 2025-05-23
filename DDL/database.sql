-- IMPORTANT -- NEEDS TO BE EXECUTED BEFOREHANDS TO GENERATE UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================
-- MAIN FORUM DATABASE
-- ========================

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       username VARCHAR(50) NOT NULL,
                       legal_names VARCHAR(100),
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,
                       security_question VARCHAR(100),
                       security_answer_hash TEXT,
                       registration_date TIMESTAMP DEFAULT now(),
                       agreement_signed_at TIMESTAMP,
                       role VARCHAR(20) CHECK (role IN ('user', 'moderator', 'admin', 'Verified User')),
                       profile_picture TEXT,
                       last_login TIMESTAMP
);

CREATE TABLE threads (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         title VARCHAR(255) NOT NULL,
                         body TEXT,
                         author_id UUID REFERENCES users(id),    --- QUESTION: Maybe it will be better to store name of the creator, as it wont be changed?
                         category VARCHAR(50),
                         created_at TIMESTAMP DEFAULT now(),
                         updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE posts (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       thread_id UUID REFERENCES threads(id),
                       author_id UUID REFERENCES users(id),
                       content TEXT,
                       created_at TIMESTAMP DEFAULT now(),
                       updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE comments (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          post_id UUID REFERENCES posts(id),
                          author_id UUID REFERENCES users(id),
                          content TEXT,
                          created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE audit_log (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           user_id UUID REFERENCES users(id),
                           action TEXT,
                           target_type VARCHAR(20),
                           target_id UUID,
                           timestamp TIMESTAMP DEFAULT now()
);

CREATE TABLE bans (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      user_id UUID REFERENCES users(id),
                      reason TEXT,
                      banned_by UUID REFERENCES users(id),
                      created_at TIMESTAMP DEFAULT now()
);

--- ========================
--- HIGH VALUE USERS DATABASE
--- ========================

CREATE TABLE high_value_users (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  username VARCHAR(50) NOT NULL,
                                  email VARCHAR(100) UNIQUE NOT NULL,
                                  password_hash TEXT NOT NULL,
                                  role VARCHAR(20) CHECK (role IN ('moderator', 'admin')),
                                  added_by UUID,
                                  added_at TIMESTAMP DEFAULT now()
);





--- ======================
--- FUNCTIONALITY
--- ======================

--- CREATE A USER
CREATE OR REPLACE FUNCTION create_user(
    p_username VARCHAR,
    p_legal_names VARCHAR,
    p_email VARCHAR,
    p_password_hash TEXT,
    p_security_question VARCHAR,
    p_security_answer_hash TEXT,
    p_role VARCHAR,
    p_profile_picture TEXT
) RETURNS UUID AS $$
DECLARE
new_user_id UUID := gen_random_uuid();
BEGIN
INSERT INTO users (
    id, username, legal_names, email, password_hash,
    security_question, security_answer_hash,
    role, profile_picture, registration_date
)
VALUES (
           new_user_id, p_username, p_legal_names, p_email, p_password_hash,
           p_security_question, p_security_answer_hash,
           p_role, p_profile_picture, now()
       );
RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;

--- Instance
SELECT create_user(
               'krutoiVasya2005',
               'Vasiliy Fedorovich Pupkin',
               'pupkin.krut@email.com',
               'hashed_password_123',
               'What is your favorite stock?',
               'hashed_answer_456',
               'Verified User',
               'https://czff.cz/vasya_prof_pic.png'
       );


SELECT create_user(
               'moneyMonkey',
               'John River Smith',
               'kolbaster@email.com',
               'hashed_password_223',
               'What is yours pets name',
               'hashed_answer_426',
               'Verified User',
               'https://czff.cz/john_prof_pic.png'
       );


SELECT create_user(
               'earnThatCheese',
               'Klara Tadeush',
               'klara221@email.com',
               'hashed_password_1443',
               'Your first love name',
               'hashed_answer_456',
               'Verified User',
               'https://czff.cz/klara_prof_pic.png'
       );





--- CREATE A THREAD

CREATE OR REPLACE FUNCTION create_thread(
    p_title VARCHAR,
    p_body TEXT,
    p_author_id UUID,
    p_category VARCHAR
) RETURNS UUID AS $$
DECLARE
new_thread_id UUID := gen_random_uuid();
BEGIN
INSERT INTO threads (
    id, title, body, author_id, category,
    created_at, updated_at
)
VALUES (
           new_thread_id, p_title, p_body, p_author_id, p_category,
           now(), now()
       );
RETURN new_thread_id;
END;
$$ LANGUAGE plpgsql;


--- Instance
SELECT create_thread(
               'Best banks to deposit in 2025',
               'Let’s share and discuss promising deposit options available on the Czech market.',
               '672cfde6-be93-419c-8f60-0044699594de',  -- ID of the creator
               'Investing'
       );



--- CREATE A POST
CREATE OR REPLACE FUNCTION create_post(
    p_thread_id UUID,
    p_author_id UUID,
    p_content TEXT
) RETURNS UUID AS $$
DECLARE
new_post_id UUID := gen_random_uuid();
BEGIN
INSERT INTO posts (
    id, thread_id, author_id, content,
    created_at, updated_at
)
VALUES (
           new_post_id, p_thread_id, p_author_id, p_content,
           now(), now()
       );
RETURN new_post_id;
END;
$$ LANGUAGE plpgsql;

--Instance
SELECT create_post(
               '354f99cc-e93c-4a38-97e7-4e427a71b3d1',
               'd09bcbfb-d1d4-4eea-8a0c-08d904712ea3',
               'I personally like KB, especially their dividend options. Good return and stable.'
       );



--- CREATE A COMMENT
CREATE OR REPLACE FUNCTION create_comment(
    p_post_id UUID,
    p_author_id UUID,
    p_content TEXT
) RETURNS UUID AS $$
DECLARE
new_comment_id UUID := gen_random_uuid();
BEGIN
INSERT INTO comments (
    id, post_id, author_id, content,
    created_at
)
VALUES (
           new_comment_id, p_post_id, p_author_id, p_content,
           now()
       );
RETURN new_comment_id;
END;
$$ LANGUAGE plpgsql;


---INSTANCE
SELECT create_comment(
               '9f6b9af9-a2a8-484c-b695-59aba8637713',
               'c50d5d7e-2100-4469-9549-5706558e2ea0',
               'Agree! KB has shown consistent returns. Also would recommend look into Fio.'
       );



--- DELETE A THREAD WITH ALL EMBEDDED CONTENT
CREATE OR REPLACE FUNCTION delete_thread(p_thread_id UUID) RETURNS VOID AS $$
BEGIN
DELETE FROM comments
WHERE post_id IN (
    SELECT id FROM posts WHERE thread_id = p_thread_id
);

DELETE FROM posts
WHERE thread_id = p_thread_id;

DELETE FROM threads
WHERE id = p_thread_id;
END;
$$ LANGUAGE plpgsql;

--INSTANCE
SELECT delete_thread('354f99cc-e93c-4a38-97e7-4e427a71b3d1');




--- DELETING A POST WITH ALL EMBEDDED CONTENT
CREATE OR REPLACE FUNCTION delete_post(p_post_id UUID) RETURNS VOID AS $$
BEGIN
DELETE FROM comments
WHERE post_id = p_post_id;

DELETE FROM posts
WHERE id = p_post_id;
END;
$$ LANGUAGE plpgsql;

--INSTANCE
SELECT delete_post('9f6b9af9-a2a8-484c-b695-59aba8637713');


--- DELETE A COMMENT
CREATE OR REPLACE FUNCTION delete_comment(p_comment_id UUID) RETURNS VOID AS $$
BEGIN
DELETE FROM comments
WHERE id = p_comment_id;
END;
$$ LANGUAGE plpgsql;


--INSTANCE
SELECT delete_comment('d2d06170-6a8a-48e4-986d-894c2cc3f8fe');