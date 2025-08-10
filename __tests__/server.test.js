const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('responds with landing page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('UGC NET Solved PYQs');
  });
});
