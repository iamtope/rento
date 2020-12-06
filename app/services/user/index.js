import queries from '../../db/queries/users';
import Db from '../../db';

const { findUser, getAllCategory } = queries;
/**
 *  Contains several methods to manage user resorces
 *  @class UserServices
 */
class UserService {
  /**
   * Fetches a User by his/her email.
   * @memberof UserService
   * @param { String } email - The email address of the user.
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  static async fetchUser(email) {
    return Db.oneOrNone(findUser, [email]);
  }
   /**
   * Fetch all categories
   * @memberof UserService
   * @returns { Promise< Object | Error | Null > } A promise that resolves or rejects
   * with a user resource  or a DB Error.
   */
  static async fetchAllCategory(){
    return Db.manyOrNone(getAllCategory, [])
  }
}

export default UserService;
