import { UserRole } from "@/domain";

export const normalizeRole = (role: string | number): UserRole => {
    if (typeof role === "number") return role as UserRole;
    switch (role) {
        case "Admin": return UserRole.Admin;
        case "Creator": return UserRole.Creator;
        default: return UserRole.Client;
    }
}