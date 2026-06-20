import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminUsersMain } from "@/widgets/admin/users/AdminUsersMain"
import { Box } from "@mantine/core"

export const AdminUsersPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminUsersMain></AdminUsersMain>
        </Box>
    )
}