import { Header } from "@/widgets/Header"
import { Box, Container, Title } from "@mantine/core"

export const NewsPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container py="xl">
                <Title order={1} ta="center">Тест новостей</Title>
            </Container>
        </Box>
    )
}