/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS category (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  ads VARCHAR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS location (
  id SERIAL PRIMARY KEY,
  state VARCHAR(30) UNIQUE NOT NULL,
  area VARCHAR(30)  UNIQUE NOT NULL,
  reated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS item (
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES user_info(id),
  category_id SERIAL REFERENCES category(id),
  location_state VARCHAR REFERENCES location(state),
  location_area VARCHAR REFERENCES location(area),
  name VARCHAR NOT NULL,
  image_url VARCHAR,
  decription VARCHAR NOT NULL,
  price VARCHAR NOT NULL,
  negotiable boolean DEFAULT false,
  availabilty VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS item_ratings (
  id SERIAL PRIMARY KEY,
  item_id SERIAL REFERENCES item(id),
  reviewer_name VARCHAR,
  rating VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
