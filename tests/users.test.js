const { describe }  = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const sinon = require('sinon');

const { User } = require('../models');

const app = require('../index');

describe('register new user. POST /user', () => {
  describe('success case', () => {
    before(() => {
      sinon.stub(User, 'create')
        .resolves({
          id: 1,
          displayName: 'Brett Wiltshire',
          email: 'brett@email.com',
          password: '123456',
          image: '',
        });

      sinon.stub(User, 'findOne')
        .resolves(true);
    });

    after(() => sinon.restore());

    it('returns status code 201 and token', async () => {
      const res = await chai
        .request(app)
        .post('/user')
        .send({
          displayName: 'Brett Wiltshire',
          email: 'brett@email.com',
          password: '123456',
          image: '',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
    });
  });

  describe('fail case', () => {
    describe('if "displayName" is smaller than 8 characters', () => {
      it('returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/user')
          .send({
            displayName: 'Brett',
            email: 'brett@email',
            password: '123456',
            image: '',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"displayName" length must be at least 8 characters long');
      });
    });

    describe(`if email isn't present in req.body`, () => {
      it('returns status code 400 and errror message', async () => {
        const res = await chai
          .request(app)
          .post('/user')
          .send({
            displayName: 'Brett Wiltshire',
            email: '',
            password: '123456',
            image: '',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"email" is required');
      });
    });
  });
});

describe('login. POST /login', () => {});

describe('get all users registered. GET /user', () => {});

describe('get registered user by id. GET /user/:id', () => {});

describe('delete own user. DELETE /user/me', () => {});
