import { AttributeType } from "@/domain";

export const getAttribTypeLabel = (type: AttributeType): string => {
    switch (type) {
        case AttributeType.String:
            return "Текст";
        case AttributeType.Number:
            return "Число";
        case AttributeType.Boolean:
            return "Да/Нет";
        default:
            return type;
    }
}