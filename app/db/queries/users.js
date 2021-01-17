export default {
  createUser: `
  INSERT INTO
     user_info(first_name, last_name, email, password, salt, phone_no, role) 
  VALUES
     (
        $1, $2, $3, $4, $5, $6, $7
     )
     RETURNING id, role, first_name, last_name, email, created_at, updated_at`,
  findUser: 'SELECT * FROM user_info WHERE email=$1',
  getAllCategory: 'SELECT * FROM category',
  findUserByToken: `SELECT *
  FROM
   activations
  WHERE
   token=$1`
};
