import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminCompanyMain } from "@/widgets/admin/company/AdminCompanyMain"
import { Box } from "@mantine/core"

export const AdminCompanyPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminCompanyMain></AdminCompanyMain>
        </Box>
    )
}