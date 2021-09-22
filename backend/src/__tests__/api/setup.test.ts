// tests if jest and supertest are working as intended
import request from 'supertest';
import server from '../../server';

describe('testing the test setup', () => {
  it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
  });

  it('gets the test endpoint', async () => {
    const response = await request(server.callback()).get('/api/test/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('test endpoint reached!');
  });
});
