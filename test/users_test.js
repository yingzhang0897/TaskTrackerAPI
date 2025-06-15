const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Routes - GET', () => {

  it('should GET all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return 404 for non-existing user ID', (done) => {
    chai.request(app)
      .get('/api/users/000000000000000000000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 400 for invalid user ID format', (done) => {
    chai.request(app)
      .get('/api/users/invalid-id')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

});
