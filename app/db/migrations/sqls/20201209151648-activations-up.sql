/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS activations(
  id SERIAL PRIMARY KEY,
  userId SERIAL NOT NULL REFERENCES user_info(id),
  token VARCHAR(25) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

)
