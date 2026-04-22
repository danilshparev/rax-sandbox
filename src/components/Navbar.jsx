import React from 'react';

export const Navbar = ({ currentView, onViewChange }) => {
    const navItems = [
        { id: 'dashboard', label: 'Маркетплейс' },
        { id: 'companies', label: 'Эмитенты' },
        { id: 'portfolio', label: 'Портфель' },
        { id: 'liquidity', label: 'Ликвидность' },
    ];

    return (
        <nav className="bg-rax-graphite px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-rax-blue rounded-lg flex items-center justify-center">
                    <span className="text-rax-dark font-bold">R</span>
                </div>
                <span className="text-white font-bold text-xl">RAX</span>
            </div>
            <div className="flex gap-6">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={`text-sm ${currentView === item.id ? 'text-rax-blue' : 'text-gray-400'}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};