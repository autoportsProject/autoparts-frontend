import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminBrandsMain } from "@/widgets/admin/brands/AdminBrandsMain";
import { Box } from "@mantine/core"

export const AdminBrandsPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminBrandsMain></AdminBrandsMain>
        </Box>
    );
}