import { ContentCard } from "@/ui/news/ContentCard"
import { Container, Title, Stack, Group, Loader, Text } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"
import { PromotionsRepo } from "@/data/repos/PromotionsRepo"
import { usePromotionsList } from "@/features/discounts/usePromotionsList";

const repo = new PromotionsRepo();

export const DiscountMain = () => {
    const {promotions, isLoading, serverError} = usePromotionsList(repo);
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap="sm" px={40}>
                <AppLinkText></AppLinkText>
                <Title order={1} mb={30} ta="center">Актуальные акции</Title>
            </Stack>
            <Stack gap="xl" maw={930} mx="auto">
                {isLoading ? (
                    <Group gap="md">
                        <Loader size="xl"></Loader>
                        <Text c="blue">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (serverError || !promotions) ? (
                    <Text c="red" ta="center" fw={700}>Произошла ошибка при загрузке акций</Text>
                ) : (promotions.length === 0) ? (
                    <Text c="blue" ta="center" size="lg" fw={500}>Пока нет акций!</Text>
                ) : promotions.map(p => (
                    <ContentCard key={p.id} title={p.name} description={p.description} createdAt={p.publishedAt} imagePath={p.imagePath}></ContentCard>
                ))}
            </Stack>
        </Container>
    )
}