export const USER_ROLES = {
    "Admin": 0, "Creator": 1, "Client": 2
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];