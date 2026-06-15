interface Catalog {
    id: string;
    name: string;
}

export const categories: Catalog[] = [
    { id: crypto.randomUUID(), name: "Автомасла" },
    { id: crypto.randomUUID(), name: "Фильтры" },
    { id: crypto.randomUUID(), name: "Запчасти для двигателей" },
    { id: crypto.randomUUID(), name: "Ремни" },
    { id: crypto.randomUUID(), name: "Топливная аппаратура" },
    { id: crypto.randomUUID(), name: "Автохимия" },
    { id: crypto.randomUUID(), name: "Автолампы" },
];