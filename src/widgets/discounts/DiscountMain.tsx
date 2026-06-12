import { ContentCard } from "@/ui/news/ContentCard"
import { Container, Title, Stack } from "@mantine/core"

export const DiscountMain = () => {
    return (
        <Container py="xl">
            <Title order={1} mb={30} ta="center">Актуальные акции</Title>
            <Stack gap="xl">
                <ContentCard type="Promo" title="Скидка 10% на масляные фильтры" createdAt="2026-06-12T10:44.596"></ContentCard>
            </Stack>
        </Container>
    )
}