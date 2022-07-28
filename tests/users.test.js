const { describe }  = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const sinon = require('sinon');

describe('register new user. POST /user', () => {});

describe('login. POST /login', () => {});

describe('get all users registered. GET /user', () => {});

describe('get registered user by id. GET /user/:id', () => {});

describe('delete own user. DELETE /user/me', () => {});
