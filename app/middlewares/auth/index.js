import UserService from '../../services/user';
import { Helper, constants, ApiError, DBError } from '../../utils';
import { signupSchema, loginSchema } from '../../validations';

const { fetchUser } = UserService;
const { errorResponse } = Helper;
const {
  EMAIL_CONFLICT,
  INTERNAL_SERVER_ERROR,
  TOKEN_NOT_EXIST,
} = constants;

/**
 * Contains several methods that validates the user
 *
 */
class AuthMiddleWare {
  /**
   * Checks if their is user conflict in the database.
   * @static
   * @param {Object} req - The request from the endpoint.
   * @param {Object} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @memberof AuthMiddleWare.
   * @returns { Promise<void> } A promise that resolves if the
   * validation is successful or rejects if its wasn't.
   */
  static async checkIfUserAlreadyExist(req, res, next) {
    try {
      const emailExist = await fetchUser(req.body.email);
      if (emailExist) {
        return errorResponse(
          req,
          res,
          new ApiError({
            status: 409,
            message: EMAIL_CONFLICT,
          })
        );
      }
      next();
    } catch (e) {
      e.status = Helper.moduleErrLogMessager(e);
      errorResponse(req, res, new ApiError({ message: INTERNAL_SERVER_ERROR }));
    }
  }

  /**
   * Validates signup request
   * @static
   * @param {Object} req - The request from the endpoint.
   * @param {Object} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @memberof AuthMiddleWare.
   * @returns { Promise<void> } A promise that resolves if the
   * validation is successful or rejects if its wasn't.
   */
  static async validateSignupFields(req, res, next) {
    try {
      logger.debug('Validating user signup credentials');
      await signupSchema.validateAsync(req.body);
      logger.debug('Credentials check out nicely!!!');
      next();
    } catch (error) {
      const { message } = error.details[0];
      errorResponse(req, res, new ApiError({ message }));
    }
  }

  /**
   * Validates user's login credentials.
   * @static
   * @param {Object} req - The request from the endpoint.
   * @param {Object} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @memberof AuthMiddleWare.
   * @returns { Promise<void> } A promise that resolves if the
   * validation is successful or rejects if its wasn't.
   */
  static async validateLoginFields(req, res, next) {
    try {
      logger.debug('Validating user login credentials');
      await loginSchema.validateAsync(req.body);
      logger.debug('Credentials check out nicely!!!');
      next();
    } catch (error) {
      const { message } = error.details[0];
      errorResponse(req, res, new ApiError({ message }));
    }
  }

  /**
   * Fetch user by email in the database
   * @static
   * @param {Object} req - The request from the endpoint.
   * @param {Object} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @returns { Promise<void> } A promise that resolves if the
   * validation is successful or rejects if its wasn't.
   */
  static async fetchUserByEmail(req, res, next) {
    try {
      const user = await fetchUser(req.body.email);
      if (!user) {
        return errorResponse(
          req,
          res,
          new DBError({
            status: 400,
            message: TOKEN_NOT_EXIST,
          })
        );
      }
      req.body.user = user;
      next();
    } catch (e) {
      e.status = Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: INTERNAL_SERVER_ERROR, status: 500 })
      );
    }
  }

  /**
   * Check if a specific user token exists in the database
   * @param {Object} req - The request from the endpoint.
   * @param {Object} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @returns { Promise<void> } A promise that resolves if the
   * validation is successful or rejects if unsuccessful.
   */
  static async verifyUserToken(req, res, next) {
    try {
      const { token } = req.body;
      const data = await UserService.findUserByToken(token);
      if (!data) {
        return errorResponse(
          req,
          res,
          new DBError({
            status: 400,
            message: TOKEN_NOT_EXIST
          })
        );
      }
      req.body.user = data;
      next();
    } catch (e) {
      e.status = Helper.moduleErrLogMessager(e);
      errorResponse(
        req,
        res,
        new ApiError({ message: INTERNAL_SERVER_ERROR, status: 500 })
      );
    }
  }
}
export default AuthMiddleWare;
