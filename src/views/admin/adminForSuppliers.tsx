import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminForSuppliersMain } from "@/widgets/admin/forSuppliers/AdminForSuppliersMain"
import { Box } from "@mantine/core"

export const AdminForSuppliersPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminForSuppliersMain></AdminForSuppliersMain>
        </Box>
    )
}