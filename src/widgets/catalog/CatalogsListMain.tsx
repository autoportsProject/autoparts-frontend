import { Accordion, Box, Button, Center, Container, Divider, Group, Loader, Stack, Text, TextInput, Title } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"
import { useCategoriesList } from "@/features/catalogs/useCategoriesList"
import { CatalogCard } from "./CatalogCard";
import styles from "@/shared/styles/catalog/catalogs-list.module.scss";
import { useState } from "react";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { getErrorMessage } from "@/shared/utils/getError";

const repo = new CategoriesRepo();

export const CatalogsListMain = () => {
    const {categories, isLoading, serverError} = useCategoriesList(repo);

    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = categories?.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered?.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));
    return (
        <Container size="100%" px={{base: 16, sm: 40}} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (serverError || !categories) ? (
                <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке списка категорий</Text>
            ) : categories.length === 0 ? (
                <Text c="blue" fw={500} ta="center" size="lg">Пока нет категорий</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm">
                        <AppLinkText></AppLinkText>
                        <Title order={1} ta="center">Выберите категорию</Title>
                    </Stack>
                    <Box className={styles.findDiv} px={{base: 0, sm: 100}}>
                        <TextInput flex={1} classNames={{
                            input: styles.input
                        }} placeholder="Поиск по названию" value={value} onChange={
                            (e) => setValue(e.currentTarget.value)
                        } onKeyDown={
                            (e) => e.key === "Enter" && setQuery(value)
                        }></TextInput>
                        <Button classNames={{root: styles.submitBtn}} onClick={
                            () => setQuery(value)
                        }>Поиск</Button>
                    </Box>
                    <Stack gap={40} px={{base: 0, sm: 100}}>
                        {letters.map((l,i) => (
                            <Stack key={i} gap="sm">
                                <Title order={3} ml="xl">{l}</Title>
                                <Divider size="md" color="blue"></Divider>
                                <Group gap="md" ml="xl">
                                    {categories
                                        .filter(c => c.name[0].toUpperCase() === l)
                                        .sort((a,b) => a.name.localeCompare(b.name, "ru"))
                                        .map(cat => (
                                            <CatalogCard key={cat.id} id={cat.id} name={cat.name}></CatalogCard>
                                        ))}
                                </Group>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}