import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminNewsMain } from "@/widgets/admin/news/AdminNewsMain"
import { Box } from "@mantine/core"

export const AdminNewsPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminNewsMain></AdminNewsMain>
        </Box>
    )
}