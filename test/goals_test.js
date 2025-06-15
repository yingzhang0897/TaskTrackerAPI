const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Goal Routes - GET', () => {

  it('should GET all goals', (done) => {
    chai.request(app)
      .get('/api/goals')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return 404 for non-existing goal ID', (done) => {
    chai.request(app)
      .get('/api/goals/000000000000000000000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 400 for invalid goal ID format', (done) => {
    chai.request(app)
      .get('/api/goals/invalid-id')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

});
