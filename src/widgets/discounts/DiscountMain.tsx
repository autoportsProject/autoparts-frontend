import { ContentCard } from "@/ui/news/ContentCard"
import { Container, Title, Stack } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"

export const DiscountMain = () => {
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap="sm" px={40}>
                <AppLinkText></AppLinkText>
                <Title order={1} mb={30} ta="center">Актуальные акции</Title>
            </Stack>
            <Stack gap="xl" maw={930} mx="auto">
                <ContentCard type="Promo" title="Скидка 10% на масляные фильтры" createdAt="2026-06-12T10:44.596"></ContentCard>
            </Stack>
        </Container>
    )
}