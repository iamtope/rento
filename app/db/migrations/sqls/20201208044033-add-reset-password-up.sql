/* Replace with your SQL commands */
ALTER TABLE IF EXISTS user_info ADD COLUMN reset_password_token VARCHAR(255);
ALTER TABLE IF EXISTS user_info ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE IF EXISTS user_info ADD COLUMN is_active BOOLEAN DEFAULT TRUE;