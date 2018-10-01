const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Sizes', () => {
  beforeEach((done) => {
    process.env.NODE_ENV = 'test';
    done();
  });
  describe('GET /sizes', () => {
    it('should return 200 including a sample body message', (done) => {
      process.env.NODE_ENV = 'no-test';
      chai.request(server)
        .get('/sizes')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('Object');
          res.body.should.have.property('message');
          res.body.message.should.equal('This is just a basic message before sending the actual list of sizes');
          done();
        });
    });
  });
});
