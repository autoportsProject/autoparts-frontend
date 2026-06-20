import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminProductMain } from "@/widgets/admin/products/AdminProductMain";
import { Box } from "@mantine/core"

interface Props {
    id: string;
}

export const AdminProductPage = ({id}: Props) => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminProductMain id={id}></AdminProductMain>
        </Box>
    )
}