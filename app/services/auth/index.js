import db from '../../db';
import queries from '../../db/queries/auth';
import { Helper, constants } from '../../utils';

/**
 * Contains a collection of service methods for managing users token
 * @class AuthService
 *
 */
class AuthService {
  /**
   * saves a user token to the database
   * @param { String } userId - userId
   * @param { String } token - token
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async saveUserVerificationToken(userId, token) {
    return db.none(queries.saveToken, [userId, token]);
  }

  /**
   * Encode user data in token
   * @param { String } token - user password reset token
   * @param { String } email - user email
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async saveUserResetPasswordToken(token, email) {
    try {
      await db.none(queries.saveResetPasswordToken, [token, email]);
    } catch (error) {
      throw Helper.processDBError(constants.SAVE_RESET_PASSOWRD_TOKEN_FAIL, error.message);
    }
  }

  /**
   * updates a user verification token to the database
   * @param { String } token - token
   * @param { String } userId - userId
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async updateUserVerificationToken(token, userId) {
    return db.none(queries.updateToken, [token, userId]);
  }

  /**
   * updates a user verification status in the database to true
   * @param { String } id - user id
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async updateUserVerificationStatus(id) {
    return db.oneOrNone(queries.updateUserVerificationStatus, ['True', id]);
  }
}

export default AuthService;
