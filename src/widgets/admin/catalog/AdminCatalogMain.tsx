import { Button, Center, Container, Divider, Group, Loader, Modal, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import styles from "@/shared/styles/admin/category/category.module.scss";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useCategoriesList } from "@/features/catalogs/useCategoriesList";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddCategoryFormValues, addCategorySchema } from "@/domain/schemas/admin/category/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "@/features/catalogs/useCreateCategory";
import { getErrorMessage } from "@/shared/utils/getError";
import { AdminCatalogCard } from "./AdminCatalogCard";

const repo = new CategoriesRepo();

export const AdminCatalogMain = () => {
    const {categories, isLoading, serverError} = useCategoriesList(repo);
    const create = useCreateCategory(repo);
    const [modalOpened, setModalOpened] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = categories?.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered?.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));

    const form = useForm<AddCategoryFormValues>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(addCategorySchema)
    });
    const onSubmit = (data: AddCategoryFormValues) => {
        create.mutate(data);
        setModalOpened(false);
        form.reset();
    };
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (serverError || !categories) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки категорий{serverError && `${getErrorMessage(serverError)}`}</Text>
            ) : (
                <>
                    <Stack gap={45}>
                        <Stack gap="sm" px={40}>
                            <AdminLinkText></AdminLinkText>
                            <Title order={1} ta="center">Категории</Title>
                        </Stack>
                        <Stack gap="md" px={140}>
                            <Button variant="outline" classNames={{
                                root: styles.addBtn
                            }} leftSection="+" onClick={() => setModalOpened(true)}>Добавить категорию</Button>
                            <Group gap="md">
                                <TextInput flex={1} classNames={{
                                    input: styles.input
                                }} placeholder="Поиск по названию" value={value} onChange={
                                    (e) => setValue(e.currentTarget.value)
                                } onKeyDown={
                                    (e) => e.key === "Enter" && setQuery(value)
                                }></TextInput>
                                <Button w={230} classNames={{root: styles.submitBtn}} onClick={() => setQuery(value)}>Поиск</Button>
                            </Group>
                        </Stack>
                        <Stack gap={40} px={140}>
                            {letters.map((l,i) => (
                                <Stack key={i} gap="sm">
                                    <Title order={3} ml="md">{l}</Title>
                                    <Divider size="md" color="blue"></Divider>
                                    <Group gap="md" ml="md">
                                        {filtered!
                                            .filter(c => c.name[0].toUpperCase() === l)
                                            .sort((a,b) => a.name.localeCompare(b.name, "ru"))
                                            .map(cat => (
                                                <AdminCatalogCard key={cat.id} category={cat}></AdminCatalogCard>
                                            ))}
                                    </Group>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                    <Modal title="Создание категории" opened={modalOpened} onClose={() => setModalOpened(false)}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap="md">
                                <TextInput {...form.register("name")} classNames={{
                                    input: styles.input
                                }} c="dimmed" label="Название категории" error={
                                    form.formState.errors.name?.message
                                }></TextInput>
                                <Button type="submit" classNames={{
                                    root: styles.submitBtn
                                }} loading={create.isPending}>Создать категорию</Button>
                            </Stack>
                        </form>
                    </Modal>
                </>
            )}
        </Container>
    )
}