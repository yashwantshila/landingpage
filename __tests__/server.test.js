process.env.ADMIN_USERNAME = 'admin';
process.env.ADMIN_PASSWORD = 'secret';
const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('responds with landing page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('UGC NET Solved PYQs');
  });
});

describe('admin authentication', () => {
  it('redirects unauthenticated access to /login', async () => {
    const res = await request(app).get('/admin');
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe('/login');
  });

  it('allows login with correct credentials', async () => {
    const agent = request.agent(app);
    const loginRes = await agent
      .post('/login')
      .type('form')
      .send({ username: 'admin', password: 'secret' });
    expect(loginRes.statusCode).toBe(302);
    expect(loginRes.headers.location).toBe('/admin');

    const adminRes = await agent.get('/admin');
    expect(adminRes.statusCode).toBe(200);
    expect(adminRes.text).toContain('Admin Dashboard');
  });
});
