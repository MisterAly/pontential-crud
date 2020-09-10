const request = require('supertest');

const app = require('../../src/app');
const db = require('../../src/db')


let userId;

describe('Dev controller',() => {

  afterAll( async (done) => {
    await db.close(done);
  })

  it('should return an error when inserting new dev', async () => {

    const dev = {
      nome: "Maria",
      sexo: "F",
      idade: 22,
    }

    const response = await request(app)
      .post('/developers')
      .send(dev)

    expect(response.status).toBe(400)

  })
  
  it('should return success when inserting new dev', async () => {

    const dev = {
      nome: "Maria",
      sexo: "F",
      idade: 22,
      hobby: "Codar",
      datanascimento: "1998/02/25"
    }

    const response = await request(app)
      .post('/developers')
      .send(dev)

    userId = response.body._id
    expect(response.status).toBe(200)

  })

  it('should return success when listing all inserted devs', async () => {

    const response = await request(app)
      .get('/developers')
      .send()

    expect(response.status).toBe(200)

  })

  it('should return success when updating inserted dev', async () => {

    const dev = {
      nome: "Maria Fernanda",
      sexo: "F",
      idade: 22,
      hobby: "Codar muito",
      datanascimento: "1998/02/25"
    }

    const response = await request(app)
      .put('/developers/' + userId)
      .send(dev)

    expect(response.status).toBe(200)

  })

  it('should return success when listing inserted dev', async () => {

    const response = await request(app)
      .get('/developers/' + userId)
      .send()

    expect(response.status).toBe(200)

  })

  it('should return success when deleting inserted dev', async (done) => {

    const response = await request(app)
      .delete('/developers/' + userId)
      .send()
    
    expect(response.status).toBe(200)
    done();
  })
})