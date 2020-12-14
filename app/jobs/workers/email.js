import { Email, Helper } from '../../utils';
import AuthService from '../../services/auth';

const {
  sendVerificationMail,
  sendResetPasswordEmail
} = Email;
const {
  saveUserVerificationToken,
  saveUserResetPasswordToken,
  updateUserVerificationToken
} = AuthService;

const { generateVerificationToken } = Helper;

/**
 * A collection of worker methods tha handles event related to email.
 *
 * @class EmailWorker
 */
class EmailWorker {
  /**
   * Handles the tasks that should be carried out whenever a new user is created.
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a user
   * @param { Function } done - done function is called on completion
   * or give it an error if error
   * @returns { null } - It returns null.
   */
  static async sendVerificationMail({ data }, done) {
    try {
      const token = generateVerificationToken();
      await saveUserVerificationToken(data.userId, token);
      await sendVerificationMail({ ...data, token });
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever a
   * users initiates the forgot password feature
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a user
   * @param { Function } done - done function is called on completion
   * or give it an error if error
   * @returns { null } - It returns null.
   */
  static async sendResetPasswordMail({ data }, done) {
    try {
      const token = generateVerificationToken();
      await saveUserResetPasswordToken(token, data.email);
      await sendResetPasswordEmail({ ...data, token });
      done();
    } catch (error) {
      done(error);
    }
  }

  /**
   * Handles the tasks that should be carried out whenever a new user requests
   * for a new verification mail
   * @static
   * @memberof EmailWorker
   * @param { Object } job - The job object containing details of a user
   * @param { Function } done - done function is called on completion
   * or give it an error if error
   * @returns { null } - It returns null.
   */
  static async resendsendVerificationMail({ data }, done) {
    try {
      const token = generateVerificationToken();
      await updateUserVerificationToken(data.userId, token);
      await sendVerificationMail({ ...data, token });
      done();
    } catch (error) {
      done(error);
    }
  }
}

export default EmailWorker;
