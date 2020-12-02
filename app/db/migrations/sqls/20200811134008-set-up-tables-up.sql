/* Replace with your SQL commands */
CREATE TYPE sfc_map_heat_type AS ENUM (
    'cold',
    'warm',
    'hot'
);
CREATE TYPE sfc_user_role_type AS ENUM (
    'admin',
    'basic'
);
CREATE TYPE sfc_group_type AS ENUM (
    'public',
    'private'
);
CREATE TYPE sfc_question_status_type AS ENUM (
    'final',
    'started',
    'not started'
);

CREATE TABLE IF NOT EXISTS user_info(
    id uuid PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    group_id uuid,
    role sfc_user_role_type NOT NULL,
    salt VARCHAR NOT NULL,
    streak INT,
    wins INT,
    loses INT,
    draws INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS groups(
    id uuid PRIMARY KEY,
    group_code VARCHAR NOT NULL,
    group_name VARCHAR NOT NULL,
    group_creator_id uuid REFERENCES user_info(id) NOT NULL,
    group_type sfc_group_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS question (
    id uuid PRIMARY KEY,
    title VARCHAR NOT NULL,
    options VARCHAR[] NOT NULL,
    start_time TIMESTAMPTZ  NOT NULL,
    end_time TIMESTAMPTZ  NOT NULL,
    map_heat sfc_map_heat_type,
    status sfc_question_status_type NOT NULL,
    category_id INT REFERENCES category(id) NULL,
    correct_answer INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS answer(
    id uuid PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES user_info(id) NOT NULL,
    question_id uuid REFERENCES question(id) NOT NULL,
    answer INT  NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
