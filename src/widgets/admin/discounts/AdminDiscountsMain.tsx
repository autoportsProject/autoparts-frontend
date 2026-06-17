import { PromotionsRepo } from "@/data/repos/PromotionsRepo"
import { AddPromotionFormValues, addPromotionSchema } from "@/domain/schemas/admin/discounts/promotions";
import { useCreatePromotion } from "@/features/discounts/useCreatePromotion";
import { usePromotionsList } from "@/features/discounts/usePromotionsList";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Center, Container, Group, Loader, Modal, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/shared/styles/admin/discounts/discounts.module.scss";
import { getErrorMessage } from "@/shared/utils/getError";
import { AdminLinkText } from "../AdminLinkText";
import { PromotionCard } from "./PromotionCard";

const repo = new PromotionsRepo();

export const AdminDiscountMain = () => {
    const {promotions, isLoading, serverError} = usePromotionsList(repo);
    const [modalOpened, setModalOpened] = useState(false);
    const create = useCreatePromotion(repo);
    const form = useForm<AddPromotionFormValues>({
        defaultValues: {
            name: "",
            description: undefined,
            publishedAt: dayjs().toISOString(),
            imagePath: undefined
        },
        resolver: zodResolver(addPromotionSchema)
    });
    const onSubmit = (data: AddPromotionFormValues) => {
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
            ) : (serverError || !promotions) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки акций{serverError && getErrorMessage(serverError)}</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText></AdminLinkText>
                        <Title order={1} ta="center">Акции</Title>
                    </Stack>
                    <Stack gap="md" px={140}>
                        <Button variant="outline" classNames={{
                            root: styles.addBtn
                        }} leftSection="+" onClick={
                            () => setModalOpened(true)
                        }>Добавить акцию</Button>
                        <Group gap="md">
                            <TextInput flex={1} classNames={{
                                input: styles.input
                            }} placeholder="Поиск по названию"></TextInput>
                            <Button w={230} classNames={{root: styles.submitBtn}}>Поиск</Button>
                        </Group>
                    </Stack>
                    <Stack gap="md" px={140}>
                        {promotions.map(p => (
                            <PromotionCard key={p.id} promotion={p}></PromotionCard>
                        ))}
                    </Stack>
                </Stack>
            )}
            <Modal title="Создание акции" opened={modalOpened} onClose={() => setModalOpened(false)}>
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
                        }}>Опубликовать акцию</Button>
                    </Stack>
                </form>
            </Modal>
        </Container>
    )
}