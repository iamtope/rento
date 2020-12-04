import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const {
  RENTO_SECRET: SECRET,
  RENTO_NODE_ENV: NODE_ENV
} = process.env;

console.log(process.env);
const currentEnv = {
  development,
  test,
  production
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  SECRET,
  NODE_ENV
};
