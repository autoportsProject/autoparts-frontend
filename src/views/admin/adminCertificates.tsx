import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminCertificatesMain } from "@/widgets/admin/certificates/AdminCertificatesMain"
import { Box } from "@mantine/core"

export const AdminCertificatesPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminCertificatesMain></AdminCertificatesMain>
        </Box>
    )
}