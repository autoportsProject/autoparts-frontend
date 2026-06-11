import { Header } from "@/widgets/Header"
import { Box, Container, Stack, Text, Title } from "@mantine/core"

export const AboutPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <Container py="xl">
                <Stack gap="sm">
                    <Title order={1} ta="center">О нас</Title>
                    <Text ta="center">Мы - организация, продающая автозапчасти для иномарок</Text>
                </Stack>
            </Container>
        </Box>
    )
}