import { Button, Center, Container, Group, Loader, Modal, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import styles from "@/shared/styles/admin/news/news.module.scss";
import { useNewsList } from "@/features/news/useNewsList";
import { NewsRepo } from "@/data/repos/NewsRepo";
import { getErrorMessage } from "@/shared/utils/getError";
import { NewsCard } from "@/widgets/admin/news/NewsCard";
import { useCreateNews } from "@/features/news/useCreateNews";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddNewsFormValues, addNewsSchema } from "@/domain/schemas/admin/news/news";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";

const repo = new NewsRepo();

export const AdminNewsMain = () => {
    const {newsList, isLoading, serverError} = useNewsList(repo);
    const [modalOpened, setModalOpened] = useState(false);
    const create = useCreateNews(repo);
    const form = useForm<AddNewsFormValues>({
        defaultValues: {
            name: "",
            description: undefined,
            publishedAt: dayjs().toISOString(),
            imagePath: undefined
        },
        resolver: zodResolver(addNewsSchema)
    });
    const onSubmit = (data: AddNewsFormValues) => {
        create.mutate(data);
        setModalOpened(false);
        form.reset();
    }
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (serverError || !newsList) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки новостей{serverError && getErrorMessage(serverError)}</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText></AdminLinkText>
                        <Title order={1} ta="center">Новости</Title>
                    </Stack>
                    <Stack gap="md" px={140}>
                        <Button variant="outline" classNames={{
                            root: styles.addBtn
                        }} leftSection="+" onClick={
                            () => setModalOpened(true)
                        }>Добавить новость</Button>
                        <Group gap="md">
                            <TextInput flex={1} classNames={{
                                input: styles.input
                            }} placeholder="Поиск по названию"></TextInput>
                            <Button w={230} classNames={{root: styles.submitBtn}}>Поиск</Button>
                        </Group>
                    </Stack>
                    <Stack gap="md" px={140}>
                        {newsList.map(n => (
                            <NewsCard key={n.id} news={n}></NewsCard>
                        ))}
                    </Stack>
                    <Modal title="Создание новости" opened={modalOpened} onClose={() => setModalOpened(false)}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap="md">
                                <TextInput {...form.register("name")} classNames={{
                                    input: styles.input
                                }} c="dimmed" error={
                                    form.formState.errors.name?.message
                                } label="Название новости"></TextInput>
                                <Textarea {...form.register("description")} classNames={{
                                    input: `${styles.input} ${styles.textarea}`
                                }} c="dimmed" label="Описание"></Textarea>
                                <TextInput {...form.register("imagePath")} classNames={{
                                    input: styles.input
                                }} label="Ссылка на изображение" c="dimmed" error={
                                    form.formState.errors.imagePath?.message
                                }></TextInput>
                                <Button type="submit" classNames={{
                                    root: styles.submitBtn
                                }}>Опубликовать новость</Button>
                            </Stack>
                        </form>
                    </Modal>
                </Stack>
            )}
        </Container>
    )
}