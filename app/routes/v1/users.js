import { Router } from 'express';
import AuthController from '../../controllers/auth/index';
import AuthMiddleWare from '../../middlewares/auth';

const {
  checkIfUserAlreadyExist,
  validateSignupFields,
  validateLoginFields,
  fetchUserByEmail,
} = AuthMiddleWare;
const { signUpUser, loginUser } = AuthController;

const userRouter = Router();

userRouter.post(
  '/signup',
  validateSignupFields,
  checkIfUserAlreadyExist,
  signUpUser
);
userRouter.post('/login', validateLoginFields, fetchUserByEmail, loginUser);

export default userRouter;
