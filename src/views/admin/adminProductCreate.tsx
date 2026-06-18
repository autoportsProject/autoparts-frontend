import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminProductCreateMain } from "@/widgets/admin/products/AdminProductCreateMain"
import { Box } from "@mantine/core"

export const AdminProductCreatePage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminProductCreateMain></AdminProductCreateMain>
        </Box>
    )
}