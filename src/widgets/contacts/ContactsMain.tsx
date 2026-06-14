import { Box, Container, Group, Image, Select, Stack, Text, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { CitySearch } from "./CitySearch";
import { CoordsDto } from "@/domain/dto/CitySearch/CoordsDto";
import { useState } from "react";

const contacts = [
    {name: "Телефон", value: "+7 800 555 35-35"},
    {name: "Email", value: "example@test.ru"},
    {name: "Telegram", value: "@testTag"},
    {name: "VK", value: "@testVK"}
]

const DEFAULT: CoordsDto = {
    lat: "55.751244",
    lon: "37.618423"
};

export const ContactsMain = () => {
    const [coords, setCoords] = useState<CoordsDto>(DEFAULT);
    const mapSrc = `https://maps.google.com/maps?q=${coords.lat},${coords.lon}&z=12&output=embed`;
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Title order={1} ta="center">Наши контакты</Title>
                <Group classNames={{root: styles.contactsSection}}>
                    {contacts.map((c,i) => (
                        <Stack key={i} classNames={{root: styles.contactDiv}}>
                            <Title order={2} classNames={{root: styles.name}}>{c.name}</Title>
                            <Text c="dimmed" classNames={{root: styles.value}}>{c.value}</Text>
                        </Stack>
                    ))}
                </Group>
                <Group classNames={{root: styles.mapSection}}>
                    <Stack classNames={{root: styles.selectRegion}}>
                        <Title order={3} ta="center">Выберите регион</Title>
                        <CitySearch onCitySelect={setCoords}></CitySearch>
                    </Stack>
                    <iframe src={mapSrc} className={styles.map} allowFullScreen></iframe>
                </Group>
            </Stack>
        </Container>
    )
}