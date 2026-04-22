// RAX Sandbox - Main Application
// This file contains all React components for the browser-based version

const { useState, useEffect } = React;

// ============== DATA ==============
const COMPANIES = [
    { id: 1, name: 'ООО "Строительная Компания ДОМ"', inn: '7842012341', rating: 'AAA', founded: 2005 },
    { id: 2, name: 'АО "Невская Недвижимость"', inn: '7813012341', rating: 'AA+', founded: 2010 },
    { id: 3, name: 'ООО "Московский Девелопмент"', inn: '7714012341', rating: 'AAA', founded: 2008 },
    { id: 4, name: 'АО "Балтийская Инвестиционная Группа"', inn: '7838012341', rating: 'AA', founded: 2012 },
];

const ASSETS = [
    { id: 1, name: 'ЖК "ИТМО Хайпарк"', type: 'Жилье', location: 'Санкт-Петербург, Пушкин', price: 185000, progress: 75, totalSupply: 5000, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop', floors: 24, completion: '2026 Q2', companyId: 1 },
    { id: 2, name: 'БЦ "Невская Перспектива"', type: 'Коммерция', location: 'Санкт-Петербург', price: 220000, progress: 45, totalSupply: 2800, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop', floors: 16, completion: '2027 Q1', companyId: 2 },
    { id: 3, name: 'ЖК "Московский Квартал"', type: 'Жилье', location: 'Москва, Южное Бутово', price: 310000, progress: 90, totalSupply: 8500, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop', floors: 32, completion: '2025 Q4', companyId: 3 },
    { id: 4, name: 'СК "Балтика Арена"', type: 'Склад', location: 'Ленинградская обл.', price: 95000, progress: 30, totalSupply: 15000, image: 'https://images.unsplash.com/photo-1553246969-7dcb425f3aaa?w=400&h=250&fit=crop', floors: 1, completion: '2027 Q2', companyId: 4 },
    { id: 5, name: 'ЖК "Средний Оккервиль"', type: 'Жилье', location: 'СПб, Всеволожск', price: 145000, progress: 60, totalSupply: 4200, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop', floors: 18, completion: '2026 Q1', companyId: 1 },
    { id: 6, name: 'ТЦ "Московский путь"', type: 'Коммерция', location: 'Москва, СВАО', price: 285000, progress: 80, totalSupply: 6200, image: 'https://images.unsplash.com/photo-1489844908441-8829872d2607?w=400&h=250&fit=crop', floors: 6, completion: '2025 Q3', companyId: 3 },
];

const DOCS = {
    1: [{ name: 'ДДУ', pages: 12 }, { name: 'Выписка ЕГРН', pages: 3 }, { name: 'Аудит 2024', pages: 45 }, { name: 'ЦФА', pages: 8 }],
    2: [{ name: 'ДДУ', pages: 14 }, { name: 'Выписка ЕГРН', pages: 2 }, { name: 'Аудит 2024', pages: 38 }, { name: 'ЦФА', pages: 6 }],
    3: [{ name: 'ДДУ', pages: 18 }, { name: 'Выписка ЕГРН', pages: 4 }, { name: 'Аудит 2024', pages: 52 }, { name: 'ЦФА', pages: 10 }],
    4: [{ name: 'Договор аренды', pages: 8 }, { name: 'Выписка ЕГРН', pages: 2 }, { name: 'Аудит 2024', pages: 28 }, { name: 'Разрешение', pages: 4 }],
    5: [{ name: 'ДДУ', pages: 11 }, { name: 'Выписка ЕГРН', pages: 3 }, { name: 'Аудит 2024', pages: 41 }, { name: 'ЦФА', pages: 7 }],
    6: [{ name: 'ДДУ', pages: 15 }, { name: 'Выписка ЕГРН', pages: 3 }, { name: 'Аудит 2024', pages: 48 }, { name: 'ЦФА', pages: 9 }],
};

// ============== UTILS ==============
const generateOrders = (basePrice) => {
    const bids = [], asks = [];
    for (let i = 0; i < 8; i++) {
        bids.push({ price: Math.round(basePrice * (1 - (i + 1) * 0.002)), amount: 10 + Math.floor(Math.random() * 40) });
        asks.push({ price: Math.round(basePrice * (1 + (i + 1) * 0.002)), amount: 10 + Math.floor(Math.random() * 40) });
    }
    return { bids: bids.sort((a, b) => b.price - a.price), asks: asks.sort((a, b) => a.price - b.price) };
};

const getCompany = (id) => COMPANIES.find(c => c.id === id);

// ============== COMPONENTS ==============

// Navigation Bar
const Navbar = ({ view, setView }) => (
    <nav className="bg-rax-graphite px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rax-blue rounded-lg flex items-center justify-center">
                <span className="text-rax-dark font-bold">R</span>
            </div>
            <span className="text-white font-bold text-xl">RAX</span>
        </div>
        <div className="flex gap-6">
            {[
                { id: 'dashboard', label: 'Маркетплейс' },
                { id: 'companies', label: 'Эмитенты' },
                { id: 'portfolio', label: 'Портфель' },
                { id: 'liquidity', label: 'Ликвидность' },
            ].map(item => (
                <button key={item.id} onClick={() => { setView(item.id); if (item.id !== 'asset') window.selectedAsset = null; }}
                    className={`text-sm ${view === item.id ? 'text-rax-blue' : 'text-gray-400'}`}>
                    {item.label}
                </button>
            ))}
        </div>
    </nav>
);

// Asset Card
const AssetCard = ({ asset, onClick }) => {
    const company = getCompany(asset.companyId);
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
                <p className="text-rax-blue text-xs mb-2">Эмитент: {company?.name}</p>
                <div className="flex justify-between mb-2">
                    <div><p className="text-gray-400 text-xs">Цена за м2</p><p className="text-rax-blue font-bold">{asset.price.toLocaleString()} T</p></div>
                    <div className="text-right"><p className="text-gray-400 text-xs">Готовность</p><p className="text-white font-bold">{asset.progress}%</p></div>
                </div>
                <div className="bg-rax-dark rounded-full h-2 mb-3"><div className="bg-rax-blue h-2 rounded-full" style={{ width: asset.progress + '%' }}></div></div>
                <button className="w-full py-2 bg-rax-blue text-rax-dark font-semibold rounded-lg hover:glow">Торговать</button>
            </div>
        </div>
    );
};

// Simple Chart
const SimpleChart = ({ data, color = '#00D1FF' }) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
        const canvas = ref.current;
        if (!canvas || !data || data.length < 2) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const prices = data.map(d => d.price);
        const min = Math.min(...prices), max = Math.max(...prices);
        const range = max - min || 1;
        ctx.fillStyle = color + '20';
        ctx.beginPath();
        ctx.moveTo(0, h);
        data.forEach((d, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((d.price - min) / range) * h * 0.8 - h * 0.1;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.forEach((d, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((d.price - min) / range) * h * 0.8 - h * 0.1;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
    }, [data, color]);
    return <canvas ref={ref} width={500} height={200} className="w-full h-full" />;
};

// Order Book
const OrderBook = ({ orders }) => (
    <div className="grid grid-cols-2 gap-4">
        <div>
            <p className="text-red-400 text-sm mb-2">Продажа</p>
            {orders.asks.slice(0, 5).map((o, i) => (
                <div key={i} className="flex justify-between text-sm bg-rax-dark p-2 rounded">
                    <span className="text-red-400">{o.price.toLocaleString()} T</span>
                    <span className="text-gray-400">{o.amount} м2</span>
                </div>
            ))}
        </div>
        <div>
            <p className="text-green-400 text-sm mb-2">Покупка</p>
            {orders.bids.slice(0, 5).map((o, i) => (
                <div key={i} className="flex justify-between text-sm bg-rax-dark p-2 rounded">
                    <span className="text-green-400">{o.price.toLocaleString()} T</span>
                    <span className="text-gray-400">{o.amount} м2</span>
                </div>
            ))}
        </div>
    </div>
);

// Docs Modal
const DocsModal = ({ assetId, onClose }) => {
    if (!assetId) return null;
    const docs = DOCS[assetId] || [];
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-rax-graphite rounded-xl p-6 max-w-lg w-full mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Документы</h2>
                    <button onClick={onClose} className="text-gray-400">✕</button>
                </div>
                {docs.map((d, i) => (
                    <div key={i} className="bg-rax-dark p-3 rounded-lg flex justify-between mb-2">
                        <span className="text-white">{d.name}</span>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">{d.pages} стр.</span>
                    </div>
                ))}
                <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-rax-blue text-sm">🔒 Актив проверен RAX AI</p>
                </div>
            </div>
        </div>
    );
};

// Notification
const Notification = ({ message, ok, onClose }) => (
    <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white animate-slide ${ok ? 'bg-green-500' : 'bg-red-500'}`}>
        {message}
    </div>
);

// ============== PAGE VIEWS ==============

const Dashboard = ({ assets, user, onAssetClick, onSell }) => (
    <div className="p-6">
        <div className="flex justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-white">RAX Sandbox</h1>
                <p className="text-gray-400">Real Assets Exchange</p>
            </div>
            <div className="bg-rax-graphite p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Баланс</p>
                <p className="text-2xl font-bold text-rax-blue">{user.balance.toLocaleString()} T</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map(a => <AssetCard key={a.id} asset={a} onClick={() => onAssetClick(a)} />)}
        </div>
        {user.portfolio.length > 0 && (
            <div className="mt-8 bg-rax-graphite rounded-xl p-6">
                <h2 className="text-white font-semibold text-xl mb-4">Ваш портфель</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {user.portfolio.map((item, i) => {
                        const a = assets.find(x => x.id === item.assetId);
                        const pnl = a ? (a.price - item.price) * item.amount : 0;
                        return (
                            <div key={i} className="bg-rax-dark p-4 rounded-lg">
                                <p className="text-white font-medium">{item.name}</p>
                                <p className="text-gray-400 text-sm">{item.amount} м2</p>
                                <div className="flex justify-between mt-2">
                                    <span className={pnl >= 0 ? 'text-green-400' : 'text-red-400'}>{pnl >= 0 ? '+' : ''}{pnl.toLocaleString()} T</span>
                                    <button onClick={(e) => { e.stopPropagation(); onSell(item); }} className="text-red-400 text-sm">Продать</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </div>
);

const AssetPage = ({ asset, orders, history, onBack, onBuy, onDocs }) => {
    const company = getCompany(asset.companyId);
    const [amount, setAmount] = React.useState(1);
    const total = asset.price * amount;
    
    return (
        <div className="p-6">
            <button onClick={onBack} className="text-rax-blue mb-4">← Назад</button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-rax-graphite rounded-xl p-4 mb-6">
                        <div className="flex justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-white">{asset.name}</h1>
                                <p className="text-gray-400">{asset.location}</p>
                                <p className="text-rax-blue text-sm">Эмитент: {company?.name}</p>
                            </div>
                            <button onClick={onDocs} className="bg-rax-blue/20 text-rax-blue px-4 py-2 rounded-lg">📄 Документы</button>
                        </div>
                        <div className="h-56 bg-rax-dark rounded-lg"><SimpleChart data={history} /></div>
                    </div>
                    <div className="bg-rax-graphite rounded-xl p-4">
                        <h3 className="text-white font-semibold mb-4">Стакан заявок</h3>
                        <OrderBook orders={orders} />
                    </div>
                </div>
                <div>
                    <div className="bg-rax-graphite rounded-xl p-4 mb-4">
                        <h3 className="text-white font-semibold mb-4">Информация</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">Тип</span><span className="text-white">{asset.type}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Этажность</span><span className="text-white">{asset.floors} эт.</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Срок сдачи</span><span className="text-white">{asset.completion}</span></div>
                            <div className="flex justify-between"><span className="text-gray-400">Предложение</span><span className="text-white">{asset.totalSupply.toLocaleString()} м2</span></div>
                        </div>
                    </div>
                    <div className="bg-rax-graphite rounded-xl p-4">
                        <h3 className="text-white font-semibold mb-4">Торговля</h3>
                        <div className="mb-3">
                            <label className="text-gray-400 text-sm">Количество (м2)</label>
                            <input type="number" min="0.1" step="0.1" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} 
                                className="w-full bg-rax-dark text-white p-2 rounded mt-1" />
                        </div>
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-400">Цена</span><span className="text-white">{asset.price.toLocaleString()} T</span>
                        </div>
                        <div className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-400">Итого</span><span className="text-rax-blue font-bold">{total.toLocaleString()} T</span>
                        </div>
                        <button onClick={() => onBuy(amount)} className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">Купить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Companies = ({ assets, onAssetClick }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Эмитенты</h1>
        <div className="space-y-4">
            {COMPANIES.map(c => (
                <div key={c.id} className="bg-rax-graphite rounded-xl p-6">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-white font-semibold text-lg">{c.name}</h3>
                            <p className="text-gray-400 text-sm">ИНН: {c.inn} • Основана: {c.founded}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${c.rating === 'AAA' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{c.rating}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                        {assets.filter(a => a.companyId === c.id).map(a => (
                            <button key={a.id} onClick={() => onAssetClick(a)} className="bg-rax-dark px-3 py-1 rounded-full text-sm text-gray-300">{a.name}</button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Portfolio = ({ assets, user, onBack }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Портфель</h1>
        {user.portfolio.length === 0 ? (
            <div className="bg-rax-graphite rounded-xl p-8 text-center">
                <p className="text-gray-400">Нет активов</p>
                <button onClick={onBack} className="text-rax-blue mt-2">Перейти к маркетплейсу</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.portfolio.map((item, i) => {
                    const a = assets.find(x => x.id === item.assetId);
                    const val = a ? a.price * item.amount : 0;
                    const pnl = a ? (a.price - item.price) * item.amount : 0;
                    return (
                        <div key={i} className="bg-rax-graphite rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src={a?.image} alt="" className="w-12 h-12 object-cover rounded" />
                                <div><p className="text-white font-medium">{item.name}</p><p className="text-gray-400 text-sm">{item.amount} м2</p></div>
                            </div>
                            <div className="text-right">
                                <p className="text-white">{val.toLocaleString()} T</p>
                                <p className={pnl >= 0 ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>{pnl >= 0 ? '+' : ''}{pnl.toLocaleString()} T</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}
    </div>
);

const Liquidity = ({ assets }) => (
    <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Ликвидность</h1>
        <div className="bg-rax-graphite rounded-xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">Средний спред</h2>
            {assets.slice(0, 4).map(a => (
                <div key={a.id} className="flex justify-between bg-rax-dark p-3 rounded mb-2">
                    <span className="text-white">{a.name}</span>
                    <span className="text-gray-400">±{(a.price * 0.02).toLocaleString()} T</span>
                </div>
            ))}
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <p className="text-green-400 font-semibold">Маркетмейкер активен</p>
            <p className="text-gray-400 text-sm mt-1">Автоматический выкуп с спредом -2%</p>
        </div>
    </div>
);

// ============== MAIN APP ==============
const App = () => {
    const [view, setView] = useState('dashboard');
    const [user, setUser] = useState({ balance: 5000000, portfolio: [] });
    const [assets, setAssets] = useState(ASSETS);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [orders, setOrders] = useState({ bids: [], asks: [] });
    const [history, setHistory] = useState([]);
    const [showDocs, setShowDocs] = useState(false);
    const [notif, setNotif] = useState(null);

    const notify = (msg, ok = true) => {
        setNotif({ msg, ok });
        setTimeout(() => setNotif(null), 2500);
    };

    // Price update interval
    useEffect(() => {
        const interval = setInterval(() => {
            setAssets(prev => prev.map(a => {
                const change = (Math.random() - 0.5) * 0.01 + a.progress / 1000;
                return { ...a, price: Math.round(a.price * (1 + change)) };
            }));
            if (selectedAsset) {
                setAssets(cur => {
                    const a = cur.find(x => x.id === selectedAsset.id);
                    if (a) {
                        setOrders(generateOrders(a.price));
                        setHistory(h => [...h.slice(-30), { time: Date.now(), price: a.price }]);
                    }
                    return cur;
                });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [selectedAsset]);

    const openAsset = (a) => {
        setSelectedAsset(a);
        setOrders(generateOrders(a.price));
        const hist = [];
        let p = a.price;
        for (let i = 30; i > 0; i--) {
            p = p * (1 + (Math.random() - 0.5) * 0.02);
            hist.push({ time: i, price: Math.round(p) });
        }
        hist.push({ time: 0, price: a.price });
        setHistory(hist);
        setView('asset');
    };

    const buy = (amount) => {
        if (!selectedAsset) return;
        const total = selectedAsset.price * amount;
        if (total > user.balance) { notify('Недостаточно средств!', false); return; }
        setUser(u => ({ ...u, balance: u.balance - total, portfolio: [...u.portfolio, { assetId: selectedAsset.id, amount, price: selectedAsset.price, name: selectedAsset.name }] }));
        setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, price: Math.round(a.price * 1.005) } : a));
        setOrders(generateOrders(Math.round(selectedAsset.price * 1.005)));
        notify(`Куплено ${amount} м2 за ${total.toLocaleString()} T`);
    };

    const sell = (item) => {
        const a = assets.find(x => x.id === item.assetId);
        if (!a) return;
        const total = a.price * item.amount;
        setUser(u => ({ ...u, balance: u.balance + total, portfolio: u.portfolio.filter((_, i) => i !== user.portfolio.indexOf(item)) }));
        setAssets(prev => prev.map(x => x.id === a.id ? { ...x, price: Math.round(x.price * 0.995) } : x));
        notify(`Продано ${item.amount} м2 за ${total.toLocaleString()} T`);
    };

    const currentAsset = selectedAsset || (view === 'asset' ? assets[0] : null);

    return (
        <div className="min-h-screen bg-rax-dark">
            <Navbar view={view} setView={(v) => { setView(v); if (v !== 'asset') setSelectedAsset(null); }} />
            
            {view === 'dashboard' && <Dashboard assets={assets} user={user} onAssetClick={openAsset} onSell={sell} />}
            {view === 'asset' && currentAsset && <AssetPage asset={currentAsset} orders={orders} history={history} onBack={() => { setView('dashboard'); setSelectedAsset(null); }} onBuy={buy} onDocs={() => setShowDocs(true)} />}
            {view === 'companies' && <Companies assets={assets} onAssetClick={openAsset} />}
            {view === 'portfolio' && <Portfolio assets={assets} user={user} onBack={() => setView('dashboard')} />}
            {view === 'liquidity' && <Liquidity assets={assets} />}
            
            {showDocs && <DocsModal assetId={currentAsset?.id} onClose={() => setShowDocs(false)} />}
            {notif && <Notification message={notif.msg} ok={notif.ok} onClose={() => setNotif(null)} />}
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);