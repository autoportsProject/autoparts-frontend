export const APPEAL_STATUS = ["New", "Accepted", "Completed", "Cancelled"] as const;
export const APPEAL_TYPES = ["Order", "Reserve", "OtherQuestion"] as const;

export type AppealStatus = typeof APPEAL_STATUS[number];
export type AppealType = typeof APPEAL_TYPES[number];