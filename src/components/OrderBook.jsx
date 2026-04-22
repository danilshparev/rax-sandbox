import React from 'react';

export const OrderBook = ({ orders }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-red-400 text-sm mb-2">Продажа</p>
                {orders.asks.slice(0, 5).map((order, i) => (
                    <div key={i} className="flex justify-between text-sm bg-rax-dark p-2 rounded">
                        <span className="text-red-400">{order.price.toLocaleString()} ₽</span>
                        <span className="text-gray-400">{order.amount} м2</span>
                    </div>
                ))}
            </div>
            <div>
                <p className="text-green-400 text-sm mb-2">Покупка</p>
                {orders.bids.slice(0, 5).map((order, i) => (
                    <div key={i} className="flex justify-between text-sm bg-rax-dark p-2 rounded">
                        <span className="text-green-400">{order.price.toLocaleString()} ₽</span>
                        <span className="text-gray-400">{order.amount} м2</span>
                    </div>
                ))}
            </div>
        </div>
    );
};