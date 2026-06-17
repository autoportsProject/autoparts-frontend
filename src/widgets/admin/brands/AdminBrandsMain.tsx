import { BrandsRepo } from "@/data/repos/BrandsRepo"
import { Button, Center, Container, Divider, Group, Loader, Modal, Stack, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/admin/brands/brands.module.scss";
import { AdminLinkText } from "../AdminLinkText";
import { BrandCard } from "./BrandCard";
import { useBrandsList } from "@/features/brands/useBrandsList";
import { getErrorMessage } from "@/shared/utils/getError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddBrandFormValues, addBrandSchema } from "@/domain/schemas/admin/brands/brand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBrand } from "@/features/brands/useCreateBrand";

const repo = new BrandsRepo();

export const AdminBrandsMain = () => {
    const {brands, isLoading, serverError} = useBrandsList(repo);
    const create = useCreateBrand(repo);
    const [modalOpened, setModalOpened] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = brands?.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered?.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));

    const form = useForm<AddBrandFormValues>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(addBrandSchema)
    });
    const onSubmit = (data: AddBrandFormValues) => {
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
            ) : (serverError || !brands) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки брендов{serverError && getErrorMessage(serverError)}</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText></AdminLinkText>
                        <Title order={1} ta="center">Бренды</Title>
                    </Stack>
                    <Stack gap="md" px={140}>
                        <Button variant="outline" classNames={{
                            root: styles.addBtn
                        }} leftSection="+" onClick={() => setModalOpened(true)}>Добавить бренд</Button>
                        <Group gap="md">
                            <TextInput flex={1} classNames={{
                                input: styles.input
                            }} placeholder="Поиск по названию" value={value} onChange={
                                (e) => setValue(e.currentTarget.value)
                            } onKeyDown={
                                (e) => e.key === "Enter" && setQuery(value)
                            }></TextInput>
                            <Button classNames={{
                                root: styles.submitBtn
                            }} w={230} onClick={() => setQuery(value)}>Поиск</Button>
                        </Group>
                    </Stack>
                    <Stack gap="md" px={140}>
                        {letters.map((l,i) => (
                            <Stack key={i} gap="sm">
                                <Title order={3} ml="md">{l}</Title>
                                <Divider size="md" color="blue"></Divider>
                                <Group gap="md" ml="md">
                                    {filtered!
                                        .filter(c => c.name[0].toUpperCase() === l)
                                        .sort((a,b) => a.name.localeCompare(b.name, "ru"))
                                        .map(b => (
                                            <BrandCard key={b.id} brand={b}></BrandCard>
                                        ))}
                                </Group>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            )}
            <Modal title="Создание бренда" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Название бренда" error={
                            form.formState.errors.name?.message
                        }></TextInput>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }} loading={create.isPending}>Создать бренд</Button>
                    </Stack>
                </form>
            </Modal>
        </Container> 
    )
}