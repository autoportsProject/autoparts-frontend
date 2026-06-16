import { ContentCard } from "@/ui/news/ContentCard"
import { Container, Stack, Title } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"

export const NewsMain = () => {
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap="sm" px={40}>
                <AppLinkText></AppLinkText>
                <Title order={1} mb={30} ta="center">Новости нашей компании</Title>
            </Stack>
            <Stack gap="xl" maw={930} mx="auto">
                <ContentCard type="News" title="У нас новый сайт" createdAt="2026-06-12T10:39.24"></ContentCard>
            </Stack>
        </Container>
    )
}