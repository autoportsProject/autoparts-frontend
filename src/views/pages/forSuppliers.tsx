import { Header } from "@/widgets/Header"
import { Box, Container, Title } from "@mantine/core"

export const ForSuppliersPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container py="xl">
                <Title order={1} ta="center">Поставщикам</Title>
            </Container>
        </Box>
    )
}