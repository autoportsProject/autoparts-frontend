import { Box, Container, Group, Image, Select, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { CitySearch } from "./CitySearch";
import { CoordsDto } from "@/domain/dto/CitySearch/CoordsDto";
import { useState } from "react";
import { CompanyInfo } from "@/shared/mocks/companyInfo";
import { AppLinkText } from "../AppLinkText";

const DEFAULT: CoordsDto = {
    lat: "56.526733",
    lon: "84.983375"
};

export const ContactsMain = () => {
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
                    {CompanyInfo.phones.map((c,i) => (
                        <Stack key={i} classNames={{root: styles.contactDiv}}>
                            <Title order={2} classNames={{root: styles.name}}>{c.name}</Title>
                            <Text c="dimmed" classNames={{root: styles.value}}>{c.value}</Text>
                        </Stack>
                    ))}
                    <Stack classNames={{root: styles.contactDiv}}>
                        <Title order={2} classNames={{root: styles.name}}>{CompanyInfo.email.name}</Title>
                        <Text c="dimmed" classNames={{root: styles.value}}>{CompanyInfo.email.value}</Text>
                    </Stack>
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