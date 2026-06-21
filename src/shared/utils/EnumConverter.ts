import { AppealType, AppealStatus, UserRole } from "@/domain"

export const getAppealStatusName = (value: number): string => {
    return Object.keys(AppealStatus).find(
        x => AppealStatus[x as keyof typeof AppealStatus] === value
    ) || "Неизвестно";
}

export const getAppealCategoryName = (value: number): string => {
    return Object.keys(AppealType).find(
        x => AppealType[x as keyof typeof AppealType] === value
    ) || "Неизвестно";
}

export const getUserRoleName = (value: number): string => {
    return Object.keys(UserRole).find(
        x => UserRole[x as keyof typeof UserRole] === value
    ) || "Неизвестно";
}