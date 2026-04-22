export const DOCS = {
    1: [{ name: 'ДДУ', pages: 12 }, { name: 'Выписка ЕГРН', pages: 3 }, { name: 'Аудит 2024', pages: 45 }, { name: 'ЦФА', pages: 8 }],
    2: [{ name: 'ДДУ', pages: 14 }, { name: 'Выписка ЕГРН', pages: 2 }, { name: 'Аудит 2024', pages: 38 }, { name: 'ЦФА', pages: 6 }],
    3: [{ name: 'ДДУ', pages: 18 }, { name: 'Выписка ЕГРН', pages: 4 }, { name: 'Аудит 2024', pages: 52 }, { name: 'ЦФА', pages: 10 }],
    4: [{ name: 'Договор аренды', pages: 8 }, { name: 'Выписка ЕГРН', pages: 2 }, { name: 'Аудит 2024', pages: 28 }, { name: 'Разрешение', pages: 4 }],
    5: [{ name: 'ДДУ', pages: 11 }, { name: 'Выписка ЕГРН', pages: 3 }, { name: 'Аудит 2024', pages: 41 }, { name: 'ЦФА', pages: 7 }],
    6: [{ name: 'ДДУ', pages: 15 }, { name: 'Выписка ЕГРН', pages: 3 }, { name: 'Аудит 2024', pages: 48 }, { name: 'ЦФА', pages: 9 }],
};

export const getDocsByAssetId = (id) => DOCS[id] || [];