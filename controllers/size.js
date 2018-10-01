const logger = require('../helpers/logger');
const stockHelper = require('../helpers/stock');
const ProductSize = require('../models/productSize');
const StockEntry = require('../models/stockEntry');

exports.getSizes = (req, res) => {
    ProductSize.find({}, (errorRetrievingProductSizes, productSizes) => {
        if (errorRetrievingProductSizes) {
            logger.log(`Error retrieving product sizes: ${errorRetrievingProductSizes}`);
            return res.status(500).send({ message: `Error retrieving product sizes: ${errorRetrievingProductSizes}` });
        }
        if (productSizes.length === 0) {
            return res.status(404).send({ message: 'No productSizes were found' });
        }

        StockEntry.find({}, (errorRetrievingStockEntries, stockEntries) => {
            if (errorRetrievingStockEntries) {
                logger.log(`Error retrieving stock entries: ${errorRetrievingStockEntries}`);
                return res.status(500).send({ message: `Error retrieving stock entries: ${errorRetrievingStockEntries}` });
            }
            if (stockEntries.length === 0) {
                return res.status(404).send({ message: 'No stock entries were found' });
            }

            const stockMap = stockHelper.createStockMap(productSizes, stockEntries);
            return res.status(200).send(stockHelper.returnStockRemovingEquivalences(stockMap));
        });
    });
};
