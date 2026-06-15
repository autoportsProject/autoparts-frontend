export const APPEAL_STATUS = {
    "New": 0, "Accepted": 1, "Completed": 2, "Cancelled": 3
} as const;
export const APPEAL_TYPES = {
    "Order": 0, "Reserve": 1, "OtherQuestion": 2
} as const;

export type AppealStatus = typeof APPEAL_STATUS[keyof typeof APPEAL_STATUS];
export type AppealType = typeof APPEAL_TYPES[keyof typeof APPEAL_TYPES];