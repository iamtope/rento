import phoneAuthentication from '../../utils/vonage/request';

/**
 * A collection of worker methods tha handles event related to email.
 *
 * @class EmailWorker
 */
class SMSWorker {
  /**
   * Handles the tasks that should be carried out whenever a new user is created.
   * @static
   * @memberof SMSWorker
   * @param { Object } job - The job object containing details of a user
   * @param { Function } done - done function is called on completion
   * or give it an error if error
   * @returns { null } - It returns null.
   */
  static async send2FASMS({ data }, done) {
    try {
      await phoneAuthentication.phoneAuthentication(data);
      done();
    } catch (error) {
      done(error);
    }
  }
}

export default SMSWorker;
