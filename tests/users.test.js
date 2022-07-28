const { describe }  = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const sinon = require('sinon');

const { Users } = require('../models');

const app = require('../index');

describe('register new user. POST /user', () => {
  describe('success case', () => {
    before(() => {
      sinon.stub(Users, 'create')
        .resolves(true);
    });

    after(() => sinon.restore());

    it('returns status code 201 and token', async () => {
      const res = chai
        .request(app)
        .post('/user')
        .send({
          displayName: 'test user',
          email: 'user-test@email.com',
          password: 'test-password',
          image: 'https://test.com/image.jpg',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
    });
  });
});

describe('login. POST /login', () => {});

describe('get all users registered. GET /user', () => {});

describe('get registered user by id. GET /user/:id', () => {});

describe('delete own user. DELETE /user/me', () => {});
