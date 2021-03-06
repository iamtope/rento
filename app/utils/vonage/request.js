import config from '../../../config/env';
import constants from '../constants';

const Nexmo = require('nexmo');

const { NEXMO_KEY, NEXMO_SECRET } = config;
const { RENTALLPRO_BRAND_NAME } = constants;

/**
 * Contains methods for sending email to the user
 */
class PhoneAuthentication {
  /**
   * Sends 2FA code through the nexmo client.
   * @static
   * @param {Object} phoneNumber -  contains the required code to authenticate a user for 2FA login
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async phoneAuthentication(phoneNumber) {
    const nexmo = new Nexmo({
      apiKey: NEXMO_KEY,
      apiSecret: NEXMO_SECRET,
    });

    const from = RENTALLPRO_BRAND_NAME;
    const to = phoneNumber;
    const text = 'Hello from Rentallpro, thanks for coming back today. Your security is our concern, that is why we have added an extra layer of security.';

    nexmo.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        logger.debug(err);
      } else if (responseData.messages[0].status === '0') {
        logger.debug('Message sent successfully.');
      } else {
        logger.debug(`Message failed with error: ${responseData.messages[0]['error-text']}`);
      }
    });
  }
}

export default PhoneAuthentication;
