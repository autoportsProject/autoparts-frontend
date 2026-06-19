import { Box, Container, Group, Image, Loader, Select, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { CitySearch } from "./CitySearch";
import { CoordsDto } from "@/domain/dto/CitySearch/CoordsDto";
import { useState } from "react";
import { CompanyInfo } from "@/shared/mocks/companyInfo";
import { AppLinkText } from "../AppLinkText";
import { ContactsRepo } from "@/data/repos/ContactsRepo";
import { useContactsList } from "@/features/company/contacts/useContactsList";

const DEFAULT: CoordsDto = {
    lat: "56.526733",
    lon: "84.983375"
};

const repo = new ContactsRepo();

export const ContactsMain = () => {
    const {contacts, isLoading, serverError} = useContactsList(repo);
    const [coords, setCoords] = useState<CoordsDto>(DEFAULT);
    const mapSrc = `https://maps.google.com/maps?q=${coords.lat},${coords.lon}&z=12&output=embed`;
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Stack gap="sm" px={40}>
                    <AppLinkText></AppLinkText>
                    <Title order={1} ta="center">Наши контакты</Title>
                </Stack>
                <Group classNames={{root: styles.contactsSection}}>
                    {isLoading ? (
                        <Group gap="md" justify="center">
                            <Loader size="xl"></Loader>
                            <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                        </Group>
                    ) : (serverError || !contacts) ? (
                        <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке контактов компании</Text>
                    ) : contacts.map((c,i) => (
                        <Stack key={i} classNames={{root: styles.contactDiv}}>
                            <Title order={2} classNames={{root: styles.name}}>{c.description}</Title>
                            <Text c="dimmed" classNames={{root: styles.value}}>{c.name}</Text>
                        </Stack>
                    ))}
                </Group>
                <Group classNames={{root: styles.mapSection}}>
                    <Stack classNames={{root: styles.selectRegion}}>
                        <Title order={3} ta="center">Выберите город</Title>
                        <CitySearch onCitySelect={setCoords}></CitySearch>
                    </Stack>
                    <iframe src={mapSrc} className={styles.map} allowFullScreen></iframe>
                </Group>
            </Stack>
        </Container>
    )
}