import queries from '../../db/queries/users';
import Db from '../../db';

const { findUser } = queries;
/**
 *  Contains several methods to manage user resorces
 * @class UserServices
 */

class UserServices {
  /**
   * Fetches a User by his/her email.
   * @memberof UserServices
   * @param { String } email - The email address of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  static async fetchUser(email) {
    return Db.oneOrNone(findUser, [email]);
  }
}

export default UserServices;
