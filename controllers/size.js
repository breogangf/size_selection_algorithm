const logger = require('../helpers/logger');
const ProductSize = require('../models/productSize');

exports.getSizes = (req, res) => {
    ProductSize.find({}, (errorRetrievingProductSizes, productSizes) => {
        if (errorRetrievingProductSizes) {
            logger.log(`Error retrieving product sizes: ${errorRetrievingProductSizes}`);
            return res.status(500).send({ message: `Error retrieving product sizes: ${errorRetrievingProductSizes}` });
        }
        if (productSizes.length === 0) {
            return res.status(404).send({ message: 'No productSizes were found' });
        }
        return res.status(200).send(productSizes);
    });
};
