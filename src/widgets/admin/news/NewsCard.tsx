import { ActionIcon, Button, Group, Modal, Stack, Text, Textarea, TextInput } from "@mantine/core";
import styles from "@/shared/styles/contentCard/news.module.scss";
import dayjs from "dayjs";
import { NewsDto } from "@/domain";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useUpdateNews } from "@/features/news/useUpdateNews";
import { NewsRepo } from "@/data/repos/NewsRepo";
import { useDeleteNews } from "@/features/news/useDeleteNews";
import { useForm } from "react-hook-form";
import { UpdateNewsFormValues, updateNewsSchema } from "@/domain/schemas/admin/news/news";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    news: NewsDto;
}

const repo = new NewsRepo();

export const NewsCard = ({news}: Props) => {
    const [modalOpened, setModalOpened] = useState(false);
    const update = useUpdateNews(repo);
    const del = useDeleteNews(repo);
    const form = useForm<UpdateNewsFormValues>({
        defaultValues: {
            name: "",
            description: undefined,
            publishedAt: dayjs().toISOString(),
            imagePath: undefined
        },
        resolver: zodResolver(updateNewsSchema)
    });
    const onSubmit = (data: UpdateNewsFormValues) => {
        update.mutate({
            id: news.id,
            req: data
        });
        setModalOpened(false);
        form.reset();
    }
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту новость?"))
            del.mutate(id);
    }
    useEffect(() => {
        if (news) {
            form.reset({
                name: news.name,
                description: news.description,
                publishedAt: news.publishedAt,
                imagePath: news.imagePath
            });
        }
    }, [form, news]);
    return (
        <Stack gap={8} classNames={{root: styles.newsCard}}>
            <Group justify="space-between">
                <Text c="dimmed">Дата публикации: {dayjs(news.publishedAt).format("DD.MM.YYYY в HH:mm")}</Text>
                <Group gap="sm">
                    <ActionIcon size="xl" onClick={
                        () => setModalOpened(true)
                    } color="green">
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon size="xl" onClick={
                        () => onDelete(news.id)
                    } color="red">
                        <IconTrash></IconTrash>
                    </ActionIcon>
                </Group>
            </Group>
            <Stack gap="sm">
                <Text classNames={{root: styles.title}}>{news.name}</Text>
                <Text>{news.description || "Нет описания"}</Text>
            </Stack>
            <Modal title="Изменение новости" opened={modalOpened} onClose={() => setModalOpened(false)}>
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
    )
}