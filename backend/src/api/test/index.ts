import { Context } from 'koa';
import Router from '@koa/router';

const router = new Router({
  prefix: `/api/test`,
});
// Test Route for jest and supertest
router.get('/', async (ctx: Context) => {
  ctx.body = { message: 'test endpoint reached!' };
});

export default router;
