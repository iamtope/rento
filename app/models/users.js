import db from '../db';
import queries from '../db/queries/users';
import { DBError, constants } from '../utils';

const { INTERNAL_SERVER_ERROR } = constants;
const { createUser } = queries;
/**
 * Contains a schema that creates user and retrieve their information
 *  @class UserModel
 *
 */
class UserModel {
  /**
   * This is a constructor for creating a User.
   * @param { Object } userInfo - contains the required properties for creating
   * User instance.
   * @returns { UserModel } - An instance of the User Model.
   * @constructor UserModel
   *
   */
  constructor(userInfo) {
    this.first_name = userInfo.firstName;
    this.last_name = userInfo.lastName;
    this.email = userInfo.email;
    this.password = userInfo.password;
    this.salt = userInfo.salt;
    this.phone_no = userInfo.phoneNumber;
    this.role = 'basic';
  }

  /**
   * Persists new Merchant to the database
   * @memberof UserModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a user object or database error
   */
  async save() {
    try {
      return db.oneOrNone(createUser, [
        this.first_name,
        this.last_name,
        this.email,
        this.password,
        this.salt,
        this.phone_no,
        this.role,
      ]);
    } catch (e) {
      const error = new DBError({
        status: INTERNAL_SERVER_ERROR,
        message: e.message,
      });

      throw error;
    }
  }
}

export default UserModel;
