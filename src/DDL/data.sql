
-- sample users and data, of course, users and data should be real people later

-- later back-end and database will need to be modified in order to support users creating accounts and writing posts


-- Sample users
INSERT INTO users (id, username, email, password_hash, names, role) VALUES
(gen_random_uuid(), 'admin', 'admin@czechfinancialforum.cz', '$2a$12$1tAzk2.TjsGQjVQ8KJL8iO2NgLtbEI9/1lA8BsY6bPZ6zqCnPtQie', 'Admin User', 'admin'),
(gen_random_uuid(), 'mod1', 'moderator1@czechfinancialforum.cz', '$2a$12$RnOQ9tU6xkSGu9TmCrAQj.hKrqJ1kN2VsUML68NqUAAfJ0V/RL2OW', 'First Moderator', 'moderator'),
(gen_random_uuid(), 'financialexpert', 'expert@finance.cz', '$2a$12$vTyF4Hmh/AZ6tpiQxJVSNuuEdvUqj3hE.qOxH9Qc1GwHPY6LKrM9q', 'Jan Novák', 'user'),
(gen_random_uuid(), 'investorpro', 'investor@gmail.com', '$2a$12$xRnKyPQEPt7Zy.wBhSXG/uCry93QEuysR.Jb5Jbv69h..QeWUgn0W', 'Petr Svoboda', 'user'),
(gen_random_uuid(), 'cryptotrader', 'crypto@seznam.cz', '$2a$12$R4PSnGPD.sA4TaR1hDHfZ.e7jHzSZ2kTRmtPiq9u2QL4nNHu1nhiy', 'Martin Dvořák', 'user');

-- maybe add more sample users later

-- Get user IDs for reference in other tables
DO $$
DECLARE
    admin_id UUID;
    mod_id UUID;
    user1_id UUID;
    user2_id UUID;
    user3_id UUID;
    thread1_id UUID;
    thread2_id UUID;
    post1_id UUID;
    post2_id UUID;
BEGIN
    SELECT id INTO admin_id FROM users WHERE username = 'admin';
    SELECT id INTO mod_id FROM users WHERE username = 'mod1';
    SELECT id INTO user1_id FROM users WHERE username = 'financialexpert';
    SELECT id INTO user2_id FROM users WHERE username = 'investorpro';
    SELECT id INTO user3_id FROM users WHERE username = 'cryptotrader';




    -- Sample threads
    INSERT INTO threads (id, title, body, author_id, category, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Czech National Bank Interest Rate Forecast', 'What are your thoughts on the upcoming CNB interest rate decision?', user1_id, 'Monetary Policy', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Best Czech Investment Platforms', 'I want to start investing in Czech stocks. Which platforms do you recommend?', user2_id, 'Investing', CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '2 days');

    SELECT id INTO thread1_id FROM threads WHERE title = 'Czech National Bank Interest Rate Forecast';
    SELECT id INTO thread2_id FROM threads WHERE title = 'Best Czech Investment Platforms';

    -- Sample posts
    INSERT INTO posts (id, thread_id, author_id, content, created_at, updated_at) VALUES
    (gen_random_uuid(), thread1_id, user3_id, 'I believe they will raise rates by 25 basis points at the next meeting.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), thread2_id, user1_id, 'I recommend Patria Finance for Czech stocks, they have reasonable fees.', CURRENT_TIMESTAMP - INTERVAL '1 day', CURRENT_TIMESTAMP - INTERVAL '1 day');

    SELECT id INTO post1_id FROM posts WHERE thread_id = thread1_id;
    SELECT id INTO post2_id FROM posts WHERE thread_id = thread2_id;

    -- Sample comments
    INSERT INTO comments (id, post_id, author_id, content, created_at) VALUES
    (gen_random_uuid(), post1_id, user2_id, 'I disagree, I think rates will remain unchanged given the recent inflation data.', CURRENT_TIMESTAMP),
    (gen_random_uuid(), post2_id, user3_id, 'XTB is also good if you want to trade international markets too.', CURRENT_TIMESTAMP - INTERVAL '12 hours');

    -- Sample ban
    INSERT INTO bans (id, user_id, reason, banned_by, created_at) VALUES
    (gen_random_uuid(), user3_id, 'Temporary ban for promotional content', mod_id, CURRENT_TIMESTAMP - INTERVAL '5 hours');




    -- Sample high value user, this one will be REALLY important later!
    INSERT INTO high_value_users (id, username, email, password_hash, role, added_by, added_at) VALUES
    (gen_random_uuid(), 'financialanalyst', 'analyst@cnb.cz', '$2a$12$P9QWjZdPEvRCYS5mYsPG5uKcQLPbQgFCpbLJw.rZW1vQYt3GWLo7y', 'moderator', admin_id, CURRENT_TIMESTAMP - INTERVAL '10 days');





    -- Sample audit logs
    INSERT INTO audit_log (id, user_id, action, target_type, target_id, timestamp) VALUES
    (gen_random_uuid(), admin_id, 'create_user', 'user', mod_id, CURRENT_TIMESTAMP - INTERVAL '30 days'),
    (gen_random_uuid(), mod_id, 'ban_user', 'user', user3_id, CURRENT_TIMESTAMP - INTERVAL '5 hours'),
    (gen_random_uuid(), user1_id, 'create_thread', 'thread', thread1_id, CURRENT_TIMESTAMP - INTERVAL '3 days');
END $$;
