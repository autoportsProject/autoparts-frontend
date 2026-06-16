import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminCatalogMain } from "@/widgets/admin/catalog/AdminCatalogMain"
import { Box } from "@mantine/core"

export const AdminCatalogPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminCatalogMain></AdminCatalogMain>
        </Box>
    )
}