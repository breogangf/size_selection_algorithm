exports.createStockMap = (productSizes, stockEntries) => {
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

    return stockMap;
};
