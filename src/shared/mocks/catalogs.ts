interface Catalog {
    id: string;
    name: string;
}

export const categories: Catalog[] = [
    { id: crypto.randomUUID(), name: "Масла и жидкости" },
    { id: crypto.randomUUID(), name: "Фильтры" },
    { id: crypto.randomUUID(), name: "Тормозная система" },
    { id: crypto.randomUUID(), name: "Подвеска" },
    { id: crypto.randomUUID(), name: "Двигатель" },
    { id: crypto.randomUUID(), name: "Электрика" },
    { id: crypto.randomUUID(), name: "Кузов" },
    { id: crypto.randomUUID(), name: "Свечи зажигания" },
];