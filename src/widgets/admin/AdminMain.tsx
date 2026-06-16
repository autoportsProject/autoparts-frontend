import styles from "@/shared/styles/admin/admin-main.module.scss";
import { Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const AdminMain = () => {
    return (
        <Container py="xl">
            <Stack classNames={{root: styles.container}}>
                <Group gap="sm" justify="center" align="center">
                    <IconAlertCircle size={44} className={styles.icon}></IconAlertCircle>
                    <Title order={1} classNames={{root: styles.h1}}>Внимание!</Title>
                </Group>
                <Text classNames={{root: styles.descr}}>Вы находитесь в разделе "Администрирование"</Text>
            </Stack>
        </Container>
    )
}