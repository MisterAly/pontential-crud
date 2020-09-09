const request = require('supertest');

const app = require('../../src/app');

describe('Authentication', () => {

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

  it('should receive JWT token when informing any username and password', async () => {

    const user = {
      username: "usuario",
      password: "123"
    }

    const response = await request(app)
      .post('/token')
      .send(user)
      
    expect(response.body).toHaveProperty("token");
  });
})