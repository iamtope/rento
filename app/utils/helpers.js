/* eslint-disable no-useless-escape */
import { sha256 } from 'js-sha256';
import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcrypt';
import crypto from 'crypto-random-string';
import jwt from 'jsonwebtoken';
import genericError from './error/generic';
import config from '../../config/env';
import constants from './constants';
import DBError from './error/db.error';
import db from '../db';

const { SECRET } = config;
const { serverError } = genericError;
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants;

/**
 *Contains Helper methods
 *
 * @class Helper
 */
class Helper {
  /**
   * It generates a uniqueId.
   * @static
   * @memberof Helper
   * @returns {String} - A unique string.
   */
  static generateId() {
    return uuidV4();
  }

  /**
   * It generates a unique Id.
   * @static
   * @memberof Helper
   * @param {string} i - Short code required
   * @returns {String} - A unique string.
   */
  static generateUniqueId(i) {
    return `${i}/${Math.random().toString(10).substr(2, 5)}`;
  }

  /**
   * It generates a unique password.
   * @static
   * @memberof Helper
   * @param {string} i - Short code required
   * @returns {String} - A unique string.
   */
  static generateUniquePassword() {
    return `${Math.random().toString(32).substr(2, 9)}`;
  }

  /**
   * It generates a unique Id.
   * @static
   * @memberof Helper
   * @param {string} i - Short code required
   * @param {string} query - query to perform
   * @returns {String} - A unique string.
   */
  static async regenerateUniqueId(i, query) {
    const id = Helper.generateUniqueId(i);
    const res = await db.oneOrNone(query, id);
    if (res === null) {
      return id;
    }
    Helper.regenerateUniqueId(i, query);
  }

  /**
   * This is used for generating a hash and a salt from a user's password.
   * @static
   * @param {string} plainPassword - password to be encrypted.
   * @memberof Helper
   * @returns {Object} - An object containing the hash and salt of a password.
   */
  static hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return {
      salt,
      hash: Helper.generateHash(salt, plainPassword),
    };
  }

  /**
   * This generates a hash.
   * @static
   * @param {String} salt - A random string.
   * @param {String} plain - A users' plain password or some sensitive data to be hashed.
   * @memberof Helper
   * @returns {String} - A hexadecimal string which is the hash value of
   *  the plain text passed as the second positional argument.
   */
  static generateHash(salt, plain) {
    const hash = sha256.hmac.create(salt);
    hash.update(plain);
    return hash.hex();
  }

  /**
   * This checks if a plain text matches a certain hash value by generating
   * a new hash with the salt used to create that hash.
   * @static
   * @param {string} plain - plain text to be used in the comparison.
   * @param {string} hash - hashed value created with the salt.
   * @param {string} salt - original salt value.
   * @memberof Helper
   * @returns {boolean} - returns a true or false, depending on the outcome of the comparison.
   */
  static compareHash(plain, hash, salt) {
    const hashMatch = Helper.generateHash(salt, plain);
    return hash === hashMatch;
  }

  /**
   * Synchronously signs the given payload into a JSON Web Token string.
   * @static
   * @param {string | number | Buffer | object} payload - payload to sign
   * @param {string | number} expiresIn - Expressed in seconds or a string describing a
   * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 2 hours.
   * @memberof Helper
   * @returns {string} - JWT Token
   */
  static generateToken(payload, expiresIn = '2h') {
    return jwt.sign(payload, SECRET, { expiresIn });
  }

  /**
   * This verify the JWT token with the secret with which the token was issued with
   * @static
   * @param {string} token - JWT Token
   * @memberof Helper
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   */
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  /**
   * Adds jwt token to object.
   * @static
   * @param { Object } user - New User Instance.
   * @param { Boolean } is_admin - A boolean that helps determine whether the user is an admin.
   * @memberof Helpers
   * @returns {object } - A new object containing essential user properties and jwt token.
   */
  static addTokenToUser(user) {
    const { id, first_name, last_name, email, role, phone_no } = user;
    const token = Helper.generateToken({
      id,
      first_name,
      last_name,
      email,
      role,
      phone_no,
    });
    return {
      id,
      first_name,
      last_name,
      email,
      role,
      token,
    };
  }

  /**
   * Parses data if it is a string as a javascript object or returns it if it is an object.
   * @static
   * @param { String | Object } data - The data.
   * @memberof Helper
   * @returns { string } - It returns the facility ame.
   */
  static parseOrReturnData(data) {
    return typeof data === 'string' ? JSON.parse(data) : data;
  }

  /**
   * Creates DB Error object and logs it with respective error message and status.
   * @static
   * @param { String | Object } data - The data.
   * @memberof Helper
   * @returns { Object } - It returns an Error Object.
   */
  static makeError({ error, status }) {
    const dbError = new DBError({
      status,
      message: error.message,
    });
    Helper.moduleErrLogMessager(dbError);
    return dbError;
  }

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @param {object} options.data - The payload.
   * @param {string} options.message -  HTTP Status code.
   * @param {number} options.code -  HTTP Status code.
   * @memberof Helpers
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  ) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data,
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @param {number} error.status -  HTTP Status code, default is 500.
   * @param {string} error.message -  Error message.
   * @param {object|array} error.errors -  A collection of  error message.
   * @memberof Helpers
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse(req, res, error) {
    const aggregateError = { ...serverError, ...error };
    Helper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors,
    });
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof Helpers
   * @returns { Null } -  It returns null.
   */
  static moduleErrLogMessager(error) {
    return logger.error(`${error.status} - ${error.name} - ${error.message}`);
  }

  /**
   * Generates log for api errors.
   * @static
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helpers
   * @returns {String} - It returns null.
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * Fetches a pagination collection of a resource.
   * @static
   * @param {Object} options - configuration options.
   * @param {number} options.page - Current page e.g: 1 represents first
   * 30 records by default and 2 represents the next 30 records.
   * @param {number} options.limit - Max number of records.
   * @param {number} options.getCount - Max number of records.
   * @param {number} options.getResources - Max number of records.
   * @param {Array} options.params - Extra parameters for the get resources query.
   * @param {Array} options.countParams - Extra parameters for the get counts query.
   * @memberof Helper
   * @returns {Promise} - Returns a promise array of the count anf the resources
   */
  static async fetchResourceByPage({
    page,
    limit,
    getCount,
    getResources,
    params = [],
    countParams = [],
  }) {
    const offSet = (page - 1) * limit;
    const fetchCount = db.one(getCount, [...countParams]);
    const fetchCountResource = db.any(getResources, [offSet, limit, ...params]);
    return Promise.all([fetchCount, fetchCountResource]);
  }

  /**
   * calculate number of pages
   * @static
   * @param { Number } total - Total number of a particular resource.
   * @param { Number } limit - The total number of resource to be displayed per page
   * @memberof Helper
   * @returns { Number } - Returns the display page value.
   */
  static calcPages(total, limit) {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  }

  /**
   * Generate token for user verification
   * @static
   * @memberof Helper
   * @returns {string} - Verification Token
   */
  static generateVerificationToken() {
    const token = crypto({ length: 16, type: 'url-safe' });
    return token;
  }
}

export default Helper;
