import { ContentCard } from "@/ui/news/ContentCard"
import { Container, Group, Loader, Stack, Text, Title } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"
import { NewsRepo } from "@/data/repos/NewsRepo"
import { useNewsList } from "@/features/news/useNewsList";

const repo = new NewsRepo();

export const NewsMain = () => {
    const {newsList, isLoading, serverError} = useNewsList(repo);
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap="sm" px={40}>
                <AppLinkText></AppLinkText>
                <Title order={1} mb={30} ta="center">Новости нашей компании</Title>
            </Stack>
            <Stack gap="xl" maw={930} mx="auto">
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="xl"></Loader>
                        <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (!newsList || serverError) ? (
                    <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке новостей</Text>
                ) : (newsList.length === 0) ? (
                    <Text c="blue" fw={500} ta="center" size="lg">Пока нет новостей!</Text>
                ) : newsList.map(n => (
                    <ContentCard key={n.id} type="News" title={n.name} description={n.description} createdAt={n.publishedAt} imagePath={n.imagePath}></ContentCard>
                ))}
            </Stack>
        </Container>
    )
}