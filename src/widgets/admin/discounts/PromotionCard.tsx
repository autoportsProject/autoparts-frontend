import { PromotionsRepo } from "@/data/repos/PromotionsRepo";
import { PromotionDto } from "@/domain"
import { UpdatePromotionFormValues, updatePromotionSchema } from "@/domain/schemas/admin/discounts/promotions";
import { useDeletePromotion } from "@/features/discounts/useDeletePromotion";
import { useUpdatePromotion } from "@/features/discounts/useUpdatePromotion";
import styles from "@/shared/styles/contentCard/news.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Group, ActionIcon, Modal, TextInput, Textarea, Button, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CardProps {
    promotion: PromotionDto;
}

const repo = new PromotionsRepo();

export const PromotionCard = ({promotion}: CardProps) => {
    const [modalOpened, setModalOpened] = useState(false);
    const update = useUpdatePromotion(repo);
    const del = useDeletePromotion(repo);
    const form = useForm<UpdatePromotionFormValues>({
        defaultValues: {
            name: "",
            description: undefined,
            publishedAt: dayjs().toISOString(),
            imagePath: undefined
        },
        resolver: zodResolver(updatePromotionSchema)
    });
    const onSubmit = (data: UpdatePromotionFormValues) => {
        update.mutate({
            id: promotion.id,
            req: data
        });
        setModalOpened(false);
        form.reset();
    }
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту акцию?"))
            del.mutate(id);
    }
    useEffect(() => {
        if (promotion) {
            form.reset({
                name: promotion.name,
                description: promotion.description,
                publishedAt: promotion.publishedAt,
                imagePath: promotion.imagePath
            });
        }
    }, [form, promotion]);
    return (
        <Stack gap={8} classNames={{root: styles.card}}>
            <Group justify="space-between">
                <Text c="dimmed">Дата публикации: {dayjs(promotion.publishedAt).format("DD.MM.YYYY в HH:mm")}</Text>
                <Group gap="sm">
                    <ActionIcon size="xl" onClick={
                        () => setModalOpened(true)
                    } color="green">
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon size="xl" onClick={
                        () => onDelete(promotion.id)
                    } color="red">
                        <IconTrash></IconTrash>
                    </ActionIcon>
                </Group>
            </Group>
            <Stack gap="sm">
                <Text classNames={{root: styles.title}}>{promotion.name}</Text>
                {promotion.imagePath && (
                    <img src={promotion.imagePath} alt={promotion.name} className={styles.cardImg}></img>
                )}
                <Text>{promotion.description || "Нет описания"}</Text>
            </Stack>
            <Modal title="Изменение акции" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            input: styles.input
                        }} c="dimmed" error={
                            form.formState.errors.name?.message
                        } label="Название акции"></TextInput>
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
                        }}>Обновить акцию</Button>
                    </Stack>
                </form>
            </Modal>
        </Stack>
    )
}