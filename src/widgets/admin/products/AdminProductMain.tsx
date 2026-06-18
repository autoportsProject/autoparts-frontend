import { Container, Stack, Title } from "@mantine/core";
import { AdminLinkText } from "../AdminLinkText";

interface Props {
    id: string;
}

export const AdminProductMain = ({id}: Props) => {
    return (
        <Container py="xl">
            <Stack gap={45}>
                <AdminLinkText></AdminLinkText>
                <Title order={1}>Информация о товаре</Title>
            </Stack>
        </Container>
    )
}