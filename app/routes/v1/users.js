import { Router } from 'express';
import AuthController from '../../controllers/auth';
import UserController from '../../controllers/users';
import AuthMiddleWare from '../../middlewares/auth';

const {
  checkIfUserAlreadyExist,
  validateSignupFields,
  validateLoginFields,
  fetchUserByEmail,
  verifyUserToken
} = AuthMiddleWare;
const { signUpUser, verifyUser, loginUser } = AuthController;
const { fetchAllCategory } = UserController;

const userRouter = Router();

userRouter.post(
  '/signup',
  validateSignupFields,
  checkIfUserAlreadyExist,
  signUpUser
);
userRouter.post('/login', validateLoginFields, fetchUserByEmail, loginUser);
userRouter.post('/verify', verifyUserToken, verifyUser);
userRouter.get('/category', fetchAllCategory);

export default userRouter;
