import { AttributeType } from "@/domain";

export const getAttribTypeLabel = (type: AttributeType): string => {
    switch (type) {
        case AttributeType.String:
            return "Текст";
        case AttributeType.Int:
            return "Целое число";
        case AttributeType.Float:
            return "Дробное число";
        case AttributeType.Bool:
            return "Да/Нет";
        default:
            return type;
    }
}