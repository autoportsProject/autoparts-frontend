import { Container, Group, Loader, Modal, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "@/shared/styles/about.module.scss";
import { IconCertificate, IconShieldCheck, IconStarFilled, IconTruck } from "@tabler/icons-react";
import { AppLinkText } from "../AppLinkText";
import { brands } from "@/shared/mocks/brands";
import { CompanyRepo } from "@/data/repos/CompanyRepo";
import { useCompany } from "@/features/company/useCompany";
import { CertificatesRepo } from "@/data/repos/CertificatesRepo";
import { useCertificatesList } from "@/features/certificates/useCertificatesList";
import { Fragment, useState } from "react";
import { CertificateDto } from "@/domain";

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

const stats = [
    {value: "20 лет", label: "на рынке"},
    {value: "40000+", label: "позиций в каталоге"},
    {value: "17+", label: "брендов запчастей"}
];

const repo = new CompanyRepo();
const cRepo = new CertificatesRepo();

export const AboutMain = () => {
    const {company, isLoading, serverError} = useCompany(repo);
    const {certificates, isLoading: areCertsLoading, serverError: certError} = useCertificatesList(cRepo);
    const [opened, setOpened] = useState<CertificateDto | null>(null);
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="xl"></Loader>
                    <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (!company || serverError) ? (
                <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке раздела "О нас"</Text>
            ) : (
                <Stack gap={60}>
                    <Stack gap="sm" px={{base: 16, sm: 40}}>
                        <AppLinkText></AppLinkText>
                        <Title order={1} mb="sm" ta="center">О нас</Title>
                        <Text ta="center" size="20px" c="dimmed">20 лет на рынке автозапчастей для спецтехники</Text>
                    </Stack>
                    <SimpleGrid cols={{base: 1, xs: 1, sm: Math.max(2, stats.length), md: Math.max(3, stats.length)}} px={{base: 16, sm: 40, md: 140}} spacing="lg">
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
                        <Title order={2} px={{base: 16, sm: 40}} c="white">Почему выбирают нас?</Title>
                        <SimpleGrid cols={{base: 1, sm: 2, md: 3}} px={{base: 16, sm: 40}} spacing="lg">
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
                    <Stack gap="xl" px={{base: 16, sm: 40}}>
                        <Title order={2}>Сертификаты</Title>
                        {areCertsLoading ? (
                            <Group gap="md" justify="center">
                                <Loader size="xl"></Loader>
                                <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                            </Group>
                        ) : (certError || !certificates) ? (
                            <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке сертификатов</Text>
                        ) : certificates.length === 0 ? (
                            <Text c="blue" fw={500} size="xl" ta="center">Пока нет сертификатов</Text>
                        ) : (
                            <SimpleGrid cols={{base: 2, sm: 3, md: 4}} spacing="lg">
                                {certificates.map(c => (
                                    <Fragment key={c.id}>
                                        <Stack classNames={{root: styles.certCard}} onClick={
                                            () => c.imagePath && setOpened(c)
                                        } align="center" gap="sm">
                                            {c.imagePath ? (
                                                <img src={c.imagePath} alt={c.name} className={styles.certIcon}></img>
                                            ) : (
                                                <IconCertificate size={48} className={styles.certIcon}></IconCertificate>
                                            )}
                                            <Text ta="center" classNames={{root: styles.certName}}>{c.name}</Text>
                                        </Stack>
                                        <Modal opened={!!opened} onClose={() => setOpened(null)} title={opened?.name} size="xl">
                                            {opened?.imagePath && (
                                                <img src={opened.imagePath} alt={opened.name} width="100%"></img>
                                            )}
                                        </Modal>
                                    </Fragment>
                                ))}
                            </SimpleGrid>
                        )}
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}