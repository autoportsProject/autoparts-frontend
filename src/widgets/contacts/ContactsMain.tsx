import { Box, Container, Stack, Title } from "@mantine/core"

export const ContactsMain = () => {
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Stack gap="sm">
                    <Title order={1} ta="center">Наши контакты</Title>
                </Stack>
            </Stack>
        </Container>
    )
}