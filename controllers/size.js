const logger = require('../helpers/logger');
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

            const stockMap = new Map();

            stockEntries.forEach((stockEntry) => {
                if (stockEntry.qty > 0) stockMap.set(stockEntry.sizeId, { qty: stockEntry.qty });
            });

            productSizes.forEach((productSize) => {
                const stockObject = (stockMap.get(productSize.id));
                if (stockObject) {
                    stockMap.set(productSize.id, {
                        sizeSystem: productSize.sizeSystem,
                        description: productSize.description,
                        qty: stockObject.qty
                    });
                }
            });


            //Return final Ids
            const ids = [];

            stockMap.forEach((stockItem, key) => {
                ids.push(key);
            });

            return res.status(200).send(ids);
        });
    });
};
