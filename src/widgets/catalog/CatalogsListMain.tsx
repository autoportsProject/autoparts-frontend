import { Accordion, Button, Container, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"
import { useCategories } from "@/features/catalogs/useCategories"
import { CatalogCard } from "./CatalogCard";
import styles from "@/shared/styles/catalog/catalogs-list.module.scss";
import { useState } from "react";

export const CatalogsListMain = () => {
    const {catalogs} = useCategories();

    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = catalogs.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));
    return (
        <Container size="100%" px={40} py="xl">
            <Stack gap={45}>
                <Stack gap="sm">
                    <AppLinkText></AppLinkText>
                    <Title order={1} ta="center">Выберите категорию</Title>
                </Stack>
                <Group gap="md" px={100}>
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
                </Group>
                <Stack gap={40} px={100}>
                    {letters.map((l,i) => (
                        <Stack key={i} gap="sm">
                            <Title order={3} ml="xl">{l}</Title>
                            <Divider size="md" color="blue"></Divider>
                            <Group gap="md" ml="xl">
                                {catalogs
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
        </Container>
    )
}