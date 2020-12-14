import constants from '../utils/constants';
import { EmailWorker, SMSWorker } from './workers';

const {
  sendVerificationMail,
  // sendInvitationMail,
  // sendResetPasswordMail,
  // resendsendVerificationMail,
  // sendApiKeyRequestMail
} = EmailWorker;

const { send2FASMS } = SMSWorker;

const {
  SEND_VERIFICATION_EMAIL,
  SEND_AUTHENTICATION_SMS
  // SEND_INVITATION_EMAIL,
  // SEND_RESET_PASSWORD_EMAIL,
  // RESEND_VERIFICATION_EMAIL,
  // SEND_API_KEY_REQUEST_EMAIL
} = constants.jobTypes;

export default (queue) => {
  queue.process(SEND_VERIFICATION_EMAIL, sendVerificationMail);
  queue.process(SEND_AUTHENTICATION_SMS, send2FASMS);
  // queue.process(SEND_INVITATION_EMAIL, sendInvitationMail);
  // queue.process(SEND_RESET_PASSWORD_EMAIL, sendResetPasswordMail);
  // queue.process(RESEND_VERIFICATION_EMAIL, resendsendVerificationMail);
  // queue.process(SEND_API_KEY_REQUEST_EMAIL, sendApiKeyRequestMail);
};
