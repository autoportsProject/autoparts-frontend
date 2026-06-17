import { AdminHeader } from "@/widgets/admin/AdminHeader"
import { AdminDiscountMain } from "@/widgets/admin/discounts/AdminDiscountsMain"
import { Box } from "@mantine/core"

export const AdminDiscountPage = () => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <AdminDiscountMain></AdminDiscountMain>
        </Box>
    )
}