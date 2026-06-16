import { Button, Container, Group, InputBase, Stack, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/supplier.module.scss";
import { IMaskInput } from "react-imask";
import { AppLinkText } from "../AppLinkText";

export const ForSuppliersMain = () => {
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Stack gap="sm" px={40}>
                    <AppLinkText></AppLinkText>
                    <Stack gap="lg">
                        <Title order={1} ta="center">{"<название карточки поставщикам>"}</Title>
                        <Text classNames={{root: styles.description}}>{"<описание карточки поставщикам>"}</Text>
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
        </Container>
    )
}