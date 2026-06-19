import { Container, Stack, Title, Tabs, Group, Select, Button, TextInput, SimpleGrid, Image, Box } from "@mantine/core"
import { IconCertificate, IconSearch, IconShieldCheck, IconStarFilled, IconTrash, IconTruck } from "@tabler/icons-react"
import styles from "@/shared/styles/main.module.scss";
import { ReasonCard } from "@/ui/main/ReasonCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

export const Main = () => {
    const [query, setQuery] = useState("");
    const nav = useRouter();

    const onSearch = () => {
        if (query.trim())
            nav.push(`/catalog/search?search=${encodeURIComponent(query)}`);
    }
    return (
        <Container size="100%" px={0} py={60}>
            <Stack gap={100}>
                <Stack gap="xl" px={40}>
                    <Title order={1}>Подобрать запчасти:</Title>
                    <Group gap="md">
                        <TextInput flex={1} size="lg" value={query} onChange={
                            (e) => setQuery(e.currentTarget.value)
                        } placeholder="Введите название или артикул запчасти" onKeyDown={
                            (e) => e.key === "Enter" && onSearch()
                        }></TextInput>
                        <Button classNames={{root: styles.submitBtn}} onClick={onSearch}>Найти</Button>
                    </Group>
                </Stack>
                <Stack gap="xl" classNames={{root: styles.whyUsDiv}}>
                    <Title order={2} classNames={{root: styles.whyUsTxt}}>Почему мы?</Title>
                    <Group justify="space-between">
                        <Group grow gap="xl">
                            {advantages.map(a => (
                                <ReasonCard key={a.title} title={a.title} description={a.description}></ReasonCard>
                            ))}
                        </Group>
                    </Group>
                </Stack>
                <Stack gap="xl">
                    <Title order={2} ml={40}>Бренды</Title>
                    <Box className={styles.brandsTrack}>
                        <Group gap={40} classNames={{root: styles.brandsDiv}}>
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                                <Image key={i} classNames={{root: styles.brandLogo}}></Image>
                            ))}
                        </Group>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}