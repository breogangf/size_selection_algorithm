const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ProductSize = require('../models/productSize');
const StockEntry = require('../models/stockEntry');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Sizes', () => {
  beforeEach((done) => {
    process.env.NODE_ENV = 'test';
    Promise.all([
      ProductSize.deleteMany(),
      StockEntry.deleteMany()
    ])
      .then(() => done(null))
      .catch(done);
  });
  describe('GET /sizes', () => {
    it('should return 200 including a sample body message', (done) => {
      const productSizes = [
        { id: 1, sizeSystem: 123, description: 'X' },
        { id: 2, sizeSystem: 321, description: 'x' },
        { id: 3, sizeSystem: 42, description: 'L' },
        { id: 4, sizeSystem: 456, description: 'S' },
        { id: 5, sizeSystem: 654, description: 'XL' },
        { id: 6, sizeSystem: 212, description: 'XX' },
        { id: 7, sizeSystem: 24, description: 'LL' },
        { id: 8, sizeSystem: 6789, description: 'XXL' }
      ];
      const stockEntries = [
        { sizeId: 1, qty: 0 },
        { sizeId: 2, qty: 2 },
        { sizeId: 3, qty: 1 },
        { sizeId: 4, qty: 1 },
        { sizeId: 5, qty: 3 },
        { sizeId: 6, qty: 3 },
        { sizeId: 7, qty: 10 },
        { sizeId: 8, qty: 1 }
      ];
      ProductSize.collection.insertMany(productSizes, (errorInsertingProductSizes) => {
        should.not.exist(errorInsertingProductSizes);
        StockEntry.collection.insertMany(stockEntries, (errorInsertingStockEntries) => {
          should.not.exist(errorInsertingStockEntries);
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
  });
});
