export const ATTRIBUTE_TYPES = {
    "String": 0, "Number": 1, "Boolean": 2
};

export type AttributeType = typeof ATTRIBUTE_TYPES[keyof typeof ATTRIBUTE_TYPES];