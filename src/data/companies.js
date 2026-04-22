export const COMPANIES = [
    { id: 1, name: 'ООО "Строительная Компания ДОМ"', inn: '7842012341', rating: 'AAA', founded: 2005 },
    { id: 2, name: 'АО "Невская Недвижимость"', inn: '7813012341', rating: 'AA+', founded: 2010 },
    { id: 3, name: 'ООО "Московский Девелопмент"', inn: '7714012341', rating: 'AAA', founded: 2008 },
    { id: 4, name: 'АО "Балтийская Инвестиционная Группа"', inn: '7838012341', rating: 'AA', founded: 2012 },
];

export const getCompanyById = (id) => COMPANIES.find(c => c.id === id);