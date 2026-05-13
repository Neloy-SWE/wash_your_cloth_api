const managerOrderPrice = (items) => {
    let totalPriceOrder = 0;

    const itemsWithTotalPrice = items.map((item) => {
        const unitPrice = Number(item.unitPrice || 0);
        const ironPressPrice = item.isIronPress ? Number(item.ironPressPrice || 0) : 0;
        const totalPricePerItem = (unitPrice + ironPressPrice) * Number(item.quantity || 0);

        totalPriceOrder += totalPricePerItem;

        return {
            ...item,
            totalPrice: totalPricePerItem,
        };
    });

    return {
        itemsWithTotalPrice,
        totalPriceOrder,
    };
};

export default managerOrderPrice;