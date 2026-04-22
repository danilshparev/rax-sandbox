export const generateOrders = (basePrice) => {
    const bids = [];
    const asks = [];
    for (let i = 0; i < 8; i++) {
        bids.push({
            price: Math.round(basePrice * (1 - (i + 1) * 0.002),
            amount: 10 + Math.floor(Math.random() * 40)
        });
        asks.push({
            price: Math.round(basePrice * (1 + (i + 1) * 0.002),
            amount: 10 + Math.floor(Math.random() * 40)
        });
    }
    return {
        bids: bids.sort((a, b) => b.price - a.price),
        asks: asks.sort((a, b) => a.price - b.price)
    };
};

export const generatePriceHistory = (basePrice, points = 30) => {
    const history = [];
    let price = basePrice;
    for (let i = points; i > 0; i--) {
        price = price * (1 + (Math.random() - 0.5) * 0.02);
        history.push({ time: i, price: Math.round(price) });
    }
    history.push({ time: 0, price: basePrice });
    return history;
};