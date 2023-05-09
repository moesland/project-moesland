const request = require('supertest');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const {
  fakeUserData, createFakeUsers, removeFakeUsers, removeAuthToken,
} = require('../testdata');
const { mockdb } = require('../mockdb');

const { expect } = chai;

describe('Authentication routes', async () => {
  describe('POST /login', () => {
    const mocking = mockdb;

    before(async () => {
      await mocking.connect();
      await createFakeUsers();
    });

    after(async () => {
      await removeAuthToken();
      await removeFakeUsers();
      await mocking.disconnect();
    });

    it('should return 401 if invalid username or password is provided', async () => {
      const response = await request(app)
        .post('/api/auth/')
        .send({ username: 'invalid', password: 'invalid' });
      expect(response.status).to.equal(401);
    }, 5000);

    it('should return a valid JWT token if valid credentials are provided', async () => {
      const response = await request(app)
        .post('/api/auth/')
        .send({ username: fakeUserData.admin.username, password: fakeUserData.admin.password });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('authToken');
      const authToken = response.body.authToken.token;
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

      expect(decodedToken).to.have.property('sub');
      expect(decodedToken).to.have.property('exp');
    }, 5000);
  });
});
