const request = require('supertest');

const app = require('../../src/app');

const db = require('../../src/db');

describe('Authentication', () => {

  afterAll( async (done) => {
    await db.close(done);
  })

  it('should return success when informing any username and password', async () => {

    const user = {
      username: "usuario",
      password: "123"
    }

    const response = await request(app)
      .post('/token')
      .send(user)
      
    expect(response.status).toBe(200);
  });

  it('should receive JWT token when informing any username and password', async (done) => {

    const user = {
      username: "usuario",
      password: "123"
    }

    const response = await request(app)
      .post('/token')
      .send(user)

    expect(response.body).toHaveProperty("token");
    done();
  });
})