const managerOrderPrice = (items, priceList) => {
    let subtotalOrder = 0;

    const priceMap = new Map(priceList.map((p) => [p.id, p]));

    const itemsWithTotalPrice = items.map((userItem) => {
        const price = priceMap.get(userItem.priceId);

        if (!price) {
            generateError("Invalid request", 400);
        }

        const basePrice = Number(price.price || 0);
        const discountPrice = Number(price.discountPrice || 0);
        const ironPressPrice = userItem.isIronPress ? Number(price.ironPressPrice || 0) : 0;

        const unitPrice = Math.max(0, basePrice - discountPrice);

        const totalPricePerItem = (unitPrice + ironPressPrice) * Number(userItem.quantity);

        subtotalOrder += totalPricePerItem;

        return {
            serviceName: price.Service ? price.Service.name : "Unknown Service",
            itemName: price.Item ? price.Item.name : "Unknown Item",
            quantity: userItem.quantity,
            unitPrice: unitPrice,
            isIronPress: userItem.isIronPress,
            ironPressPrice: ironPressPrice,
            totalPrice: totalPricePerItem,
        };
    });

    return {
        itemsWithTotalPrice,
        subtotalOrder,
    };
};

export default managerOrderPrice;