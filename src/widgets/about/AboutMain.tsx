import { Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "@/shared/styles/about.module.scss";
import { IconCertificate, IconShieldCheck, IconStarFilled, IconTruck } from "@tabler/icons-react";
import { AppLinkText } from "../AppLinkText";
import { brands } from "@/shared/mocks/brands";

const advantages = [
    {
        icon: IconShieldCheck,
        title: "Оригинальные запчасти",
        description: "Мы работаем только с официальными дистрибьюторами. Каждая позиция проходит проверку подлинности"
    },
    {
        icon: IconTruck,
        title: "Быстрая доставка",
        description: "Мы доставляем запчасти по всей России. Срок доставки - от 1 до 7 дней, в зависимости от региона доставки"
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

const stats = [
    {value: "20 лет", label: "на рынке"},
    {value: "40000+", label: "позиций в каталоге"},
    {value: "17+", label: "брендов запчастей"},
    {value: "РФ", label: "Доставка по всей России"}
];

const certs = [
    {name: "Сертификат соответствия ISO 9001"},
    { name: "Официальный дистрибьютор Bosch" },
    { name: "Авторизованный партнёр Mann-Filter" },
    { name: "<здесь название сертификата>" },
];

export const AboutMain = () => {
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Stack gap="sm" px={40}>
                    <AppLinkText></AppLinkText>
                    <Title order={1} mb="sm" ta="center">О нас</Title>
                    <Text ta="center" size="20px" c="dimmed">20 лет на рынке автозапчастей для спецтехники</Text>
                </Stack>
                <SimpleGrid cols={4} px={40} spacing="lg">
                    {stats.map(s => (
                        <Stack key={s.value} classNames={{root: styles.statCard}} gap={8} align="center">
                            <Text classNames={{root: styles.statValue}}>{s.value}</Text>
                            <Text classNames={{root: styles.statLabel}}>{s.label}</Text>
                        </Stack>
                    ))}
                </SimpleGrid>
                <Stack gap="lg" classNames={{root: styles.aboutDiv}}>
                    <Title order={2}>О компании</Title>
                    <Stack gap="md" classNames={{root: styles.aboutBlock}}>
                        <Title order={3}>Кто мы?</Title>
                        <Stack gap={5}>
                            <Text classNames={{root: styles.aboutTxt}} size="lg">
                                Приветствуем вас на странице компании <em>«АвтоИноМир»</em>!
                            </Text>
                            <Text classNames={{root: styles.aboutTxt}}>
                                Уже 20 лет наша компания занимается 
                                продажей автозапчастей для лесозаготовительной, сельскохозяйственной, строительной и дорожно-строительной 
                                спецтехники.
                            </Text>
                            <Text classNames={{root: styles.aboutTxt}}>
                                Наш каталог включает более 40 000 позиций оригинальных автозапчастей.
                            </Text>
                        </Stack>
                    </Stack>
                    <Stack gap="md" classNames={{root: styles.aboutBlock}}>
                        <Title order={3}>Что мы предоставляем?</Title>
                        <Stack gap={5}>
                            <Text classNames={{root: styles.aboutTxt}}>
                                В ассортименте представлены ведущие мировые производители:
                            </Text>
                            {brands.map(b => (
                                <Text key={b.category} classNames={{root: styles.aboutTxt}}>
                                    <strong>{b.category}:</strong> {b.names}
                                </Text>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
                <Stack gap="xl" classNames={{root: styles.advantagesDiv}}>
                    <Title order={2} px={40} c="white">Почему выбирают нас?</Title>
                    <SimpleGrid cols={2} px={40} spacing="lg">
                        {advantages.map(({icon: Icon, title, description}) => (
                            <Group key={title} classNames={{root: styles.advantageCard}} gap="md">
                                <ThemeIcon size={48} radius="md" classNames={{root: styles.advantageIcon}}>
                                    <Icon size={24}></Icon>
                                </ThemeIcon>
                                <Stack gap={8} flex={1}>
                                    <Text classNames={{root: styles.advantageTitle}}>{title}</Text>
                                    <Text classNames={{root: styles.advantageDescr}}>{description}</Text>
                                </Stack>
                            </Group>
                        ))}
                    </SimpleGrid>
                </Stack>
                <Stack gap="xl" px={40}>
                    <Title order={2}>Сертификаты</Title>
                    <SimpleGrid cols={4} spacing="lg">
                        {certs.map(c => (
                            <Stack key={c.name} classNames={{root: styles.certCard}} align="center" gap="sm">
                                <IconCertificate size={48} className={styles.certIcon}></IconCertificate>
                                <Text ta="center" classNames={{root: styles.certName}}>{c.name}</Text>
                            </Stack>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Stack>
        </Container>
    )
}