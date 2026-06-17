import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminAppealsMain } from "@/widgets/admin/appeals/AdminAppealsMain"
import { Box } from "@mantine/core"

export const AdminAppealsPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminAppealsMain></AdminAppealsMain>
        </Box>
    )
}