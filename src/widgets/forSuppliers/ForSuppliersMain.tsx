import { Button, Container, Group, InputBase, Loader, Stack, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/supplier.module.scss";
import { IMaskInput } from "react-imask";
import { AppLinkText } from "../AppLinkText";
import { ForSuppliersPageRepo } from "@/data/repos/ForSuppliersPageRepo";
import { useForSuppliersPage } from "@/features/forSuppliers/useForSuppliersPage";

const repo = new ForSuppliersPageRepo();

export const ForSuppliersMain = () => {
    const {page, isLoading, serverError} = useForSuppliersPage(repo);
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="xl"></Loader>
                    <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (serverError || !page) ? (
                <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке раздела Поставщикам</Text>
            ) : (
                <Stack gap={60}>
                    <Stack gap="sm" px={40}>
                        <AppLinkText></AppLinkText>
                        <Stack gap="lg">
                            <Title order={1} ta="center">{page.title}</Title>
                            <Text classNames={{root: styles.description}}>{page.content}</Text>
                        </Stack>
                    </Stack>
                    <Stack gap="lg" align="center" classNames={{root: styles.conditionsDiv}}>
                        <Stack gap={8} classNames={{root: styles.form}}>
                            <Title order={3} mb={8} ta="center">Заполните форму ниже</Title>
                            <TextInput withAsterisk label="ФИО контактного лица"></TextInput>
                            <TextInput withAsterisk label="Название компании"></TextInput>
                            <Group grow>
                                <TextInput type="email" withAsterisk label="Email"></TextInput>
                                <InputBase component={IMaskInput} withAsterisk label="Контактный телефон" mask="+7 (000) 000-00-00" placeholder="+7 (___) ___-__-__"></InputBase>
                            </Group>
                            <Button mt={8} classNames={{root: styles.submitBtn}}>Отправить</Button>
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}