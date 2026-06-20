import { ForSuppliersPageRepo } from "@/data/repos/ForSuppliersPageRepo"
import { Button, Center, Container, Divider, Group, Loader, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import { AdminLinkText } from "../AdminLinkText";
import { useForSuppliersPage } from "@/features/forSuppliers/useForSuppliersPage";
import { getErrorMessage } from "@/shared/utils/getError";
import { useForm } from "react-hook-form";
import { UpdateForSuppliersPageFormValues, updateForSuppliersPageSchema } from "@/domain/schemas/admin/forSuppliers/forSuppliers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateForSuppliersPage } from "@/features/forSuppliers/useUpdateForSuppliersPage";
import styles from "@/shared/styles/admin/forSuppliers/suppliers.module.scss";
import { useEffect } from "react";

const repo = new ForSuppliersPageRepo();

export const AdminForSuppliersMain = () => {
    const {page, isLoading, serverError} = useForSuppliersPage(repo);
    const update = useUpdateForSuppliersPage(repo);
    const form = useForm<UpdateForSuppliersPageFormValues>({
        defaultValues: {
            title: "",
            content: ""
        },
        resolver: zodResolver(updateForSuppliersPageSchema)
    });
    const onSubmit = (data: UpdateForSuppliersPageFormValues) => {
        update.mutate(data);
        form.reset();
    }
    useEffect(() => {
        if (page) {
            form.reset({
                title: page.title,
                content: page.content
            });
        }
    }, [form, page]);
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={45}>
                <Stack gap="sm" px={40}>
                    <AdminLinkText></AdminLinkText>
                    <Title order={1} ta="center">Карточка "Поставщикам"</Title>
                </Stack>
                {isLoading ? (
                    <Center py="xl">
                        <Loader size="xl"></Loader>
                    </Center>
                ) : (serverError || !page) ? (
                    <Text c="red" fw={700} ta="center">Ошибка загрузки карточки "Поставщикам" {serverError && getErrorMessage(serverError)}</Text>
                ) : (
                    <Stack classNames={{root: styles.form}}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap="md">
                                <TextInput classNames={{
                                    input: styles.input
                                }} label="Заголовок карточки" {...form.register("title")} error={
                                    form.formState.errors.title?.message
                                }></TextInput>
                                <Textarea classNames={{
                                    input: `${styles.input} ${styles.textarea}`
                                }} label="Описание" {...form.register("content")} error={
                                    form.formState.errors.content?.message
                                }></Textarea>
                                <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить информацию</Button>
                            </Stack>
                        </form>
                    </Stack>
                )}
            </Stack>
        </Container>
    )
}