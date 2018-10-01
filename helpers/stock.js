const permutationHelper = require('./permutation');
const sortNumbersHelper = require('./sortNumbers');

exports.createStockMap = (productSizes, stockEntries) => {
    const stockMap = new Map();

    stockEntries.forEach((stockEntry) => {
        if (stockEntry.qty > 0) stockMap.set(stockEntry.sizeId, { qty: stockEntry.qty });
    });

    productSizes.forEach((productSize) => {
        const stockObject = (stockMap.get(productSize.id));
        if (stockObject) {
            stockMap.set(productSize.id, {
                sizeId: productSize.id,
                sizeSystem: productSize.sizeSystem,
                description: productSize.description,
                qty: stockObject.qty
            });
        }
    });

    return stockMap;
};

exports.removeStockEquivalences = (stockMap) => {
    const stockArray = Array.from(stockMap.values());

    const sortedStockArray = stockArray.map((stockItem) => {
        return { ...stockItem, sizeSystem: sortNumbersHelper.sortNumber(stockItem.sizeSystem) };
    });

    const groupBy = (array, key) => {
        return array.reduce((returnValue, element) => {
            (returnValue[element[key]] = returnValue[element[key]] || []).push(element);
            return returnValue;
        }, {});
    };

    const groupedStock = groupBy(sortedStockArray, 'sizeSystem');
    //console.log(groupedStock);
};
