import { Container, Stack, Title, Tabs, Group, Select, Button, TextInput, SimpleGrid, Image, Box, Loader, Text } from "@mantine/core"
import { IconCertificate, IconSearch, IconShieldCheck, IconStarFilled, IconTrash, IconTruck } from "@tabler/icons-react"
import styles from "@/shared/styles/main.module.scss";
import { ReasonCard } from "@/ui/main/ReasonCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BrandsRepo } from "@/data/repos/BrandsRepo";
import { useBrandsList } from "@/features/brands/useBrandsList";

const advantages = [
    {
        icon: IconShieldCheck,
        title: "Оригинальные запчасти",
        description: "Мы работаем только с официальными дистрибьюторами. Каждая позиция проходит проверку подлинности"
    },
    {
        icon: IconStarFilled,
        title: "Гарантия качества",
        description: "Мы предоставляем гарантию на все наши товары. При несоответствии - возврат или замена"
    },
    {
        icon: IconCertificate,
        title: "Сертифицированная продукция",
        description: "Вся наша продукция сертифицирована и соответствует всем стандартам качества"
    }
];

const repo = new BrandsRepo();

export const Main = () => {
    const [query, setQuery] = useState("");
    const nav = useRouter();

    const {brands, isLoading, serverError} = useBrandsList(repo);

    const onSearch = () => {
        if (query.trim())
            nav.push(`/catalog/search?search=${encodeURIComponent(query)}`);
    }
    return (
        <Container size="100%" px={0} py={60}>
            <Stack gap={0}>
                <Stack gap="xl" px={40} mb={80}>
                    <Title order={1}>Найти запчасти:</Title>
                    <Box className={styles.enterNameDiv}>
                        <TextInput flex={1} size="lg" value={query} onChange={
                            (e) => setQuery(e.currentTarget.value)
                        } placeholder="Введите название или артикул запчасти" onKeyDown={
                            (e) => e.key === "Enter" && onSearch()
                        }></TextInput>
                        <Button classNames={{root: styles.submitBtn}} onClick={onSearch}>Найти</Button>
                    </Box>
                </Stack>
                <Stack gap="xl" classNames={{root: styles.whyUsDiv}} mb={80}>
                    <Title order={2} classNames={{root: styles.whyUsTxt}}>Почему мы?</Title>
                    <Group justify="space-between">
                        <Box className={styles.reasonCardsDiv}>
                            {advantages.map(a => (
                                <ReasonCard key={a.title} title={a.title} description={a.description}></ReasonCard>
                            ))}
                        </Box>
                    </Group>
                </Stack>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="xl"></Loader>
                        <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (serverError || !brands) ? (
                    <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке брендов</Text>
                ) : brands.length === 0 ? (
                    <Text c="blue" fw={500} ta="center" size="lg">Пока нет брендов</Text>
                ) : (
                    <Stack gap="xl">
                        <Title order={2} ml={40}>Бренды</Title>
                        <Box className={styles.brandsTrack}>
                            <Group gap={40} classNames={{root: styles.brandsDiv}}>
                                {[...brands, ...brands].map((b,i) => (
                                    <Text key={i} fw={700} size="lg" classNames={{root: styles.brandLogo}}>
                                        {b.name}
                                    </Text>
                                ))}
                            </Group>
                        </Box>
                    </Stack>
                )}
            </Stack>
        </Container>
    )
}