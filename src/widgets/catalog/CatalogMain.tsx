import { Container, Stack, Title } from "@mantine/core"
import styles from "@/shared/styles/catalog.module.scss";

interface CatalogProps {
    categoryName: string;
}

export const CatalogMain = ({categoryName}: CatalogProps) => {
    return (
        <Container px={0} py={60}>
            <Stack gap={60}>
                <Title order={1}>Найти запчасти</Title>
                <Stack gap="lg" classNames={{root: styles.filterDiv}}>
                    
                </Stack>
            </Stack>
        </Container>
    )
}