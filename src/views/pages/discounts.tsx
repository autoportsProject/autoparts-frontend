import { DiscountMain } from "@/widgets/discounts/DiscountMain"
import { Header } from "@/widgets/Header"
import { Box } from "@mantine/core"

export const DiscountsPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <DiscountMain></DiscountMain>
        </Box>
    )
}