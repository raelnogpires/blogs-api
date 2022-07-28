const { describe }  = require('mocha');
const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const sinon = require('sinon');

const { User } = require('../models');

const app = require('../index');

const jwt = require('jsonwebtoken');

const { secret, configs } = require('../config/jwtConfig');

const token = jwt.sign({ data: { email: 'brett@email.com' } }, secret, configs);

describe('01 - register new user. POST /user', () => {
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
        .resolves(false);
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
            email: 'brett@email.com',
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

    describe(`if email isn't valid`, () => {
      it('returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/user')
          .send({
            displayName: 'Brett Wiltshire',
            email: 'brett@',
            password: '123456',
            image: '',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"email" must be a valid email');
      });
    });

    describe(`if password isn't present in req.body`, () => {
      it('returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/user')
          .send({
            displayName: 'Brett Wiltshire',
            email: 'brett@email.com',
            password: '',
            image: '',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"password" is required');
      });
    });

    describe('if password is smaller or bigger than 6 characters', () => {
      it('returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/user')
          .send({
            displayName: 'Brett Wiltshire',
            email: 'brett@email.com',
            password: '123',
            image: '',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"password" length must be 6 characters long');
      });
    });

    describe('if email is already registered', () => {
      before(() => {
        sinon.stub(User, 'findOne')
          .resolves(true);
      });

      after(() => sinon.restore());

      it('returns status code 409 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/user')
          .send({
            displayName: 'Brett Wiltshire',
            email: 'brett@email.com',
            password: '123456',
            image: '',
          });

        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Email already exists');
      });
    });
  });
});

describe('02 - login. POST /login', () => {
  describe('success case', () => {
    before(() => {
      sinon.stub(User, 'findOne')
        .resolves(true);
    });

    after(() => sinon.restore());

    it('returns status code 200 and token', async () => {
      const res = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'brett@email.com',
          password: '123456',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });

  describe('fail case', () => {
    describe(`if email isn't present in req.body`, () => {
      it('no email field - returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/login')
          .send({
            password: '123456',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"email" is required');
      });

      it('email field empty - returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/login')
          .send({
            email: '',
            password: '123456',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"email" is not allowed to be empty');
      });
    });

    describe(`if password isn't present in req.body`, () => {
      it('no password field - returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'brett@email.com',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"password" is required');
      });

      it('password field empty - returns status code 400 and error message', async () => {
        const res = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'brett@email.com',
            password: '',
          });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('"password" is not allowed to be empty');
      });
    });
  });
});

describe('03 - get all users registered. GET /user', () => {
  describe('success case', () => {
    before(() => {
      sinon.stub(User, 'findOne')
        .resolves({ dataValues: { id: 1 } });

      sinon.stub(User, 'findAll')
        .resolves([
          {
            id: 1,
            displayName: 'Brett Wiltshire',
            email: 'brett@email.com',
            image: '',
          },
        ]);

      sinon.stub(jwt, 'verify')
        .returns({ data: { email: 'brett@email.com' } });
    });

    after(() => sinon.restore());

    it('returns status code 200 and array of users', async () => {
      const res = await chai
        .request(app)
        .get('/user')
        .set('authorization', 'validtoken');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('id');
      expect(res.body[0]).to.have.property('displayName');
      expect(res.body[0]).to.have.property('email');
      expect(res.body[0]).to.have.property('image');
    });
  });
});

describe('04 - get registered user by id. GET /user/:id', () => {
  describe('success case', () => {
    before(() => {
      sinon.stub(User, 'findOne')
        .resolves({
          dataValues: {
            id: 1,
            displayName: 'Brett Wiltshire',
            email: 'brett@email.com',
            image: '',
          },
      });
    });

    after(() => sinon.restore());

    it('returns status code 200 and especified user', async () => {
      const res = await chai
        .request(app)
        .get('/user/1')
        .set('authorization', token);

      expect(res.status).to.equal(200);
      expect(res.body.dataValues).to.have.property('id');
      expect(res.body.dataValues).to.have.property('displayName');
      expect(res.body.dataValues).to.have.property('email');
      expect(res.body.dataValues).to.have.property('image');
    });
  });

  describe('fail case', () => {});
});

describe('05 - delete own user. DELETE /user/me', () => {});
