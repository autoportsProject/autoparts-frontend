import { ForSuppliersMain } from "@/widgets/forSuppliers/ForSuppliersMain"
import { Header } from "@/widgets/Header"
import { Box, Container, Title } from "@mantine/core"

export const ForSuppliersPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <ForSuppliersMain></ForSuppliersMain>
        </Box>
    )
}