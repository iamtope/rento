/* Replace with your SQL commands */

CREATE TYPE rento_user_type AS ENUM (
    'admin',
    'basic'
);


CREATE TABLE IF NOT EXISTS user_info(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    phone_no INTEGER NOT NULL,
    role rento_user_type NOT NULL,
    salt VARCHAR NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);