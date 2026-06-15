import { Button, Container, Group, Select, Stack, Title } from "@mantine/core"
import styles from "@/shared/styles/catalog/catalog.module.scss";
import { AppLinkText } from "../AppLinkText";

interface CatalogProps {
    categoryName: string;
}

export const CatalogMain = ({categoryName}: CatalogProps) => {
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Stack gap="sm" px={40}>
                    <AppLinkText></AppLinkText>
                    <Stack classNames={{root: styles.container}}>
                        <Title order={1}>Найти запчасти</Title>
                        <Stack gap="lg" classNames={{root: styles.filterDiv}}>
                            <Select label="Тип"></Select>
                            <Group gap="md" justify="flex-end">
                                <Button classNames={{root: styles.submitBtn}}>Поиск</Button>
                                <Button classNames={{root: styles.cancelBtn}}>Отмена</Button>
                            </Group>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}