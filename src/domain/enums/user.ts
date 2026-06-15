export const USER_ROLES = ["Admin", "Creator", "Client"] as const;

export type UserRole = typeof USER_ROLES[number];