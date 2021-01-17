export default {
  saveToken: `INSERT
    INTO
      activations(userid, token)
    VALUES
      ($1, $2)`,
  updateUserVerificationStatus: `UPDATE 
  users
    SET
  is_verified=$1 WHERE id=$2;`,
};
