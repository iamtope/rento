import UserModel from '../../models/users';
import { Helper, constants, genericErrors, ApiError } from '../../utils';
import AuthService from '../../services/auth';
import Job from '../../jobs';

const {
  CREATE_USER_SUCCESSFULLY,
  INVALID_CREDENTIALS,
  LOGIN_USER_SUCCESSFULLY,
  jobTypes
} = constants;

const {
  SEND_VERIFICATION_EMAIL,
  SEND_AUTHENTICATION_SMS
} = jobTypes;

const { successResponse, errorResponse } = Helper;
const { serverError } = genericErrors;
const { updateUserVerificationStatus } = AuthService;

/**
 * Contain several methods that authenticate user and the response they recieve
 */
class AuthController {
  /**
   * Register user
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @returns {JSON} A JSON response return by the function which includes user details and JWT
   * @memberof AuthController
   */
  static async signUpUser(req, res, next) {
    const { salt, hash } = Helper.hashPassword(req.body.password);
    try {
      const user = new UserModel({ ...req.body, salt, password: hash });
      const userDetails = await user.save();
      Job.create({ type: SEND_VERIFICATION_EMAIL, data: userDetails });
      return successResponse(res, {
        code: 201,
        message: CREATE_USER_SUCCESSFULLY,
        data: userDetails,
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }

  /**
   * Verify user after signup
      * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @returns {JSON} A JSON response return by the functio
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async verifyUser(req, res, next) {
    const { user } = req.body;
    try {
      await updateUserVerificationStatus(user.userid);
      return {};
    } catch (err) {
      return next(errorResponse(req, res, serverError));
    }
  }

  /**
   * Login merchant on successful verification
   * @param {Object} req - The request from the endpoint.
   * @param {Object} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @memberof AuthController
   * @returns { Promise< Error | Null > } A promise that resolves or rejects
   */
  static async loginUser(req, res, next) {
    const { user, password } = req.body;
    try {
      const isAuthenticated = Helper.compareHash(
        password,
        user.password,
        user.salt
      );
      if (!isAuthenticated) {
        return errorResponse(
          req,
          res,
          new ApiError({
            status: 401,
            message: INVALID_CREDENTIALS,
          })
        );
      }
      Job.create({ type: SEND_AUTHENTICATION_SMS, data: (user.phone_no) });
      const data = await Helper.addTokenToUser(user);
      return successResponse(res, {
        code: 200,
        message: LOGIN_USER_SUCCESSFULLY,
        data,
      });
    } catch (error) {
      return next(errorResponse(req, res, serverError));
    }
  }
}

export default AuthController;
