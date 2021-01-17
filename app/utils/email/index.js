import sgMail from '@sendgrid/mail';
import config from '../../../config/env';
import EmailGenerator from './templates';

const { RENTO_SENDGRID_API_KEY, RENTO_HOST_URL, RENTO_SENDGRID_EMAIL } = config;

const {
  configMailGen,
  mailGenEmailFormat,
  resetPasswordMailGenFormat
} = EmailGenerator;

sgMail.setApiKey(RENTO_SENDGRID_API_KEY);

/**
 * Contains methods for sending email to the user
 */
class Email {
  /**
   * Sends emails through the mail client.
   * @static
   * @param {Object} options -  contains the required properties for creating a user
   * verification mail instance
   * @param {string} token - The token to be sent
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async sendVerificationMail(options) {
    const link = `${RENTO_HOST_URL}/login?token=${options.token}`;
    const mailGen = await configMailGen();
    const emailFormat = await mailGenEmailFormat(options.firstName, link);
    const emailTemplate = mailGen.generate(emailFormat);
    const message = {
      to: options.email,
      from: RENTO_SENDGRID_EMAIL, // Use the email address or domain you verified above
      subject: 'Welcome to Rentallpro, Verify Your Email to Get Started',
      html: emailTemplate
    };
    return sgMail.send(message);
  }

  /**
   * Sends emails through the mail client for password reset.
   * @static
   * @param {Object} options -  contains the required properties for creating a user
   * reset pasword mail instance
   * @param {string} token - The token to be sent
   * @memberof Email
   * @returns {Promise<object | string>} - A promise which is fulfilled as a string or
   *  an error object.
   */
  static async sendResetPasswordEmail(options) {
    const link = `${RENTO_HOST_URL}/reset-password?token=${options.token}`;
    const mailGen = configMailGen();
    const emailFormat = await resetPasswordMailGenFormat(link);
    const emailTemplate = mailGen.generate(emailFormat);
    const message = {
      to: options.email,
      from: RENTO_SENDGRID_EMAIL,
      subject: 'Reset your password',
      html: emailTemplate
    };
    return sgMail.send(message);
  }
}

export default Email;
