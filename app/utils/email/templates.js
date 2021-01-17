import Mailgen from 'mailgen';

/**
 * Contains function that generates  email
 *@class EmailGenerator
 @constructor EmailGenerator
 */
class EmailGenerator {
  /**
 * Configure Mailgen by setting the theme
 * @static
 *@memberof EmailGenerator
 @returns {Object} - It return the default email generator provided
 */
  static configMailGen() {
    const mail = new Mailgen({
      theme: 'default',
      product: {
        name: 'Rentallpro',
        link: 'http://localhost:3000/api/v1',
      },
    });
    return mail;
  }

  /**
  * Generate a email for user to confirm the email provided during signup;
  * @static
  * @param { String } firstName - user first name
  * @param { String } mailLink - link to verify email
  *@memberof EmailGenerator
  @returns {Object} - It returns the object of email format provided
  */
  static mailGenEmailFormat(firstName, mailLink) {
    const body = {
      body: {
        name: firstName,
        intro:
          "Welcome to Rentallpro! We're very excited to have you on board.",
        action: {
          instructions: 'To join the league',
          button: {
            color: '#22BC66',
            text: 'verify your account',
            link: mailLink,
          },
        },
        outro:
          'This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address. For assistance please email us directly',
      },
    };

    return body;
  }

  /**
  * Generate a email for user to intitiate the change password process;
  * @static
  * @param { String } mailLink - link to verify email
  *@memberof EmailGenerator
  @returns {Object} - It returns the object of email format provided
  */
  static resetPasswordMailGenFormat(mailLink) {
    const body = {
      body: {
        name: 'There',
        intro: 'Reset your password',
        action: {
          instructions:
            'We received a request to reset your password, click here to continue',
          button: {
            color: '#22BC66',
            text: 'Reset your password',
            link: mailLink,
          },
        },
        outro:
          'This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address. For assistance please email us directly',
      },
    };

    return body;
  }
}

export default EmailGenerator;
