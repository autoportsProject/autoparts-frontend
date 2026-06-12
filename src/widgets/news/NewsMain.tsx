import { ContentCard } from "@/ui/news/ContentCard"
import { Container, Stack, Title } from "@mantine/core"

export const NewsMain = () => {
    return (
        <Container py="xl">
            <Title order={1} mb={30} ta="center">Новости нашей компании</Title>
            <Stack gap="xl">
                <ContentCard type="News" title="У нас новый сайт" createdAt="2026-06-12T10:39.24"></ContentCard>
            </Stack>
        </Container>
    )
}