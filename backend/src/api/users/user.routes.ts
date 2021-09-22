import Router from '@koa/router';
import { retrieveUserInfo, register } from './user.controller';

const router = new Router({
  prefix: `/api/users`,
});

router
  .get(
    '/:username',
    retrieveUserInfo,
    //TODO: Not sure what to do here, probably retrieve user information after successfully being authenticated by cognito
  )
  .post('/register', register);

export default router;
