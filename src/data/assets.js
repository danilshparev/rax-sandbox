export const ASSETS = [
    { id: 1, name: 'ЖК "ИТМО Хайпарк"', type: 'Жилье', location: 'Санкт-Петербург, Пушкин', price: 185000, progress: 75, totalSupply: 5000, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop', floors: 24, completion: '2026 Q2', companyId: 1 },
    { id: 2, name: 'БЦ "Невская Перспектива"', type: 'Коммерция', location: 'Санкт-Петербург', price: 220000, progress: 45, totalSupply: 2800, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop', floors: 16, completion: '2027 Q1', companyId: 2 },
    { id: 3, name: 'ЖК "Московский Квартал"', type: 'Жилье', location: 'Москва, Южное Бутово', price: 310000, progress: 90, totalSupply: 8500, image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop', floors: 32, completion: '2025 Q4', companyId: 3 },
    { id: 4, name: 'СК "Балтика Арена"', type: 'Склад', location: 'Ленинградская обл.', price: 95000, progress: 30, totalSupply: 15000, image: 'https://images.unsplash.com/photo-1553246969-7dcb425f3aaa?w=400&h=250&fit=crop', floors: 1, completion: '2027 Q2', companyId: 4 },
    { id: 5, name: 'ЖК "Средний Оккервиль"', type: 'Жилье', location: 'СПб, Всеволожск', price: 145000, progress: 60, totalSupply: 4200, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop', floors: 18, completion: '2026 Q1', companyId: 1 },
    { id: 6, name: 'ТЦ "Московский путь"', type: 'Коммерция', location: 'Москва, СВАО', price: 285000, progress: 80, totalSupply: 6200, image: 'https://images.unsplash.com/photo-1489844908441-8829872d2607?w=400&h=250&fit=crop', floors: 6, completion: '2025 Q3', companyId: 3 },
];

export const getAssetById = (id) => ASSETS.find(a => a.id === id);