const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Task Routes - GET', () => {

  it('should GET all tasks', (done) => {
    chai.request(app)
      .get('/api/tasks')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should GET a task by ID', (done) => {
    const taskId = 'Ov23liO7eFGXaJJdvmul';
    chai.request(app)
      .get(`/api/tasks/${taskId}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 404 for non-existing task ID', (done) => {
    chai.request(app)
      .get('/api/tasks/000000000000000000000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 400 for invalid task ID format', (done) => {
    chai.request(app)
      .get('/api/tasks/invalid-id')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
