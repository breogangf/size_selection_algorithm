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

exports.returnStockRemovingEquivalences = (stockMap) => {
    const stockArray = Array.from(stockMap.values());

    const sortedStockArray = stockArray.map((stockItem) => {
        return { ...stockItem, sizeSystem: sortNumbersHelper.sortNumber(stockItem.sizeSystem) };
    });

    //Group by sizeSystem
    const groupBy = (array, key) => {
        return array.reduce((returnValue, element) => {
            (returnValue[element[key]] = returnValue[element[key]] || []).push(element);
            return returnValue;
        }, {});
    };

    //Get Max value for each stock item
    const groupedStock = new Map(Object.entries(groupBy(sortedStockArray, 'sizeSystem')));
    const groupedStockArray = Array.from(groupedStock.values());
    const result = groupedStockArray.map((a) => {
        const maxQty = Math.max(...a.map(b => b.qty));
        return a.find((o) => o.qty === maxQty).sizeId;
    });
    //Ascending sort the result
    return result.sort((a, b) => a - b);
};
