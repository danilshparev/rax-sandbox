import React from 'react';

export const AssetCard = ({ asset, companyName, onClick }) => {
    return (
        <div onClick={onClick} className="bg-rax-graphite rounded-xl overflow-hidden card transition-all cursor-pointer">
            <img src={asset.image} alt={asset.name} className="w-full h-44 object-cover" />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-white font-semibold">{asset.name}</h3>
                        <p className="text-gray-400 text-sm">{asset.location}</p>
                    </div>
                    <span className="bg-rax-dark px-2 py-1 rounded text-xs text-white">{asset.type}</span>
                </div>
                <p className="text-rax-blue text-xs mb-2">Эмитент: {companyName}</p>
                <div className="flex justify-between mb-2">
                    <div>
                        <p className="text-gray-400 text-xs">Цена за м2</p>
                        <p className="text-rax-blue font-bold">{asset.price.toLocaleString()} T</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-400 text-xs">Готовность</p>
                        <p className="text-white font-bold">{asset.progress}%</p>
                    </div>
                </div>
                <div className="bg-rax-dark rounded-full h-2 mb-3">
                    <div className="bg-rax-blue h-2 rounded-full" style={{ width: asset.progress + '%' }}></div>
                </div>
                <button className="w-full py-2 bg-rax-blue text-rax-dark font-semibold rounded-lg hover:glow">Torговать</button>
            </div>
        </div>
    );
};