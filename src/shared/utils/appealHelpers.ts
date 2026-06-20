import { AppealStatus, AppealType } from "@/domain";

export const getStatusLabel = (status: AppealStatus): string => {
    switch (status) {
        case AppealStatus.New:
            return "Новое";
        case AppealStatus.Accepted:
            return "В работе";
        case AppealStatus.Completed:
            return "Завершено";
        case AppealStatus.Cancelled:
            return "Отклонено";
        default:
            return status;
    }
};

export const getStatusColor = (status: AppealStatus): string => {
    switch (status) {
        case AppealStatus.New:
            return "New";
        case AppealStatus.Accepted:
            return "Accepted";
        case AppealStatus.Completed:
            return "Completed";
        case AppealStatus.Cancelled:
            return "Cancelled";
        default:
            return "Unknown";
    }
};

export const getCategoryLabel = (category: AppealType): string => {
    switch (category) {
        case AppealType.Order:
            return "Заказ";
        case AppealType.Reserve:
            return "Бронь";
        case AppealType.OtherQuestion:
            return "Другой вопрос";
        default:
            return category;
    }
}