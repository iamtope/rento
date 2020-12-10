export default {
  saveToken: `INSERT
    INTO
      activations(userid, token)
    VALUES
      ($1, $2)
    ON CONFLICT (userid)
    DO
    UPDATE SET token = EXCLUDED.token;`
};
