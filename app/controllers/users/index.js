import { Helper, constants, genericErrors } from '../../utils';
import UserService from '../../services/user';

const { FETCH_CATEGORY_SUCCESSFUL } = constants;
const { successResponse, errorResponse } = Helper;
const { serverError } = genericErrors;

/**
 * Contain several methods that authenticate user and the response they recieve
 */
class UserController {
  /**
   * Register user
   * @param {Request} req - The request sent from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {function} next - Calls the next handle.
   * @returns {JSON} A JSON response return by the function which includes user details and JWT
   * @memberof AuthController
   */
  static async fetchAllCategory(req, res, next) {
    try {
      const data = await UserService.fetchAllCategory();
      return successResponse(res, {
        code: 200,
        message: FETCH_CATEGORY_SUCCESSFUL,
        data,
      });
    } catch (e) {
      return next(errorResponse(req, res, serverError));
    }
  }
}

export default UserController;
