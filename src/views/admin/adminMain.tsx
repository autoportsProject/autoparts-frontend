import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminMain } from "@/widgets/admin/AdminMain"
import { Box } from "@mantine/core"

export const AdminMainPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminMain></AdminMain>
        </Box>
    )
}