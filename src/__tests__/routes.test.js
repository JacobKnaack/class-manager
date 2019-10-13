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
    const testUser = {email: 'tester@test.com', password: 'test'};

    it('Creates a token on successful sign-up', (done) => {
      request.post('/api/signup')
        .set('Content-Type', 'application/json')
        .send(testUser)
        .expect(200)
        .then(response => {
          expect(jwt.verify(response.text, process.env.API_SECRET)).toBeTruthy();
          done();
        });
    });

    it('Passes back a token on successful sign-in', (done) => {
      request.post('/api/signin')
        .auth(testUser.email, testUser.password)
        .expect(200)
        .then(response => {
          expect(jwt.verify(response.text, process.env.API_SECRET)).toBeTruthy();
          done();
        })
    })
  });
});
