'use strict';

const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const server = require('../server');
const mockDB = require('./util/mockDB');
const request = supertest(server.app);

beforeAll(mockDB.startDB);
afterAll(mockDB.stopDB);

describe('Tests the router', () => {
  describe('User route', () => {
    it('Creates returns a token on success', (done) => {
      const testUser = {email: 'tester@test.com', password: 'test'};
      request
        .post('/api/signup')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .expect(200)
        .then(response => {
          expect(jwt.verify(response.text, process.env.API_SECRET)).toBeTruthy();
          done();
        });
    });
  });
});
