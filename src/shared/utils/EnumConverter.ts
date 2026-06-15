import { APPEAL_STATUS, APPEAL_TYPES, USER_ROLES } from "@/domain"

export const getAppealStatusName = (value: number): string => {
    return Object.keys(APPEAL_STATUS).find(
        x => APPEAL_STATUS[x as keyof typeof APPEAL_STATUS] === value
    ) || "Неизвестно";
}

export const getAppealCategoryName = (value: number): string => {
    return Object.keys(APPEAL_TYPES).find(
        x => APPEAL_TYPES[x as keyof typeof APPEAL_TYPES] === value
    ) || "Неизвестно";
}

export const getUserRoleName = (value: number): string => {
    return Object.keys(USER_ROLES).find(
        x => USER_ROLES[x as keyof typeof USER_ROLES] === value
    ) || "Неизвестно";
}