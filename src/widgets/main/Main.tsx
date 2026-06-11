import { Container, Stack, Title, Tabs, Group, Select, Button, TextInput } from "@mantine/core"
import { IconSearch, IconTrash } from "@tabler/icons-react"
import styles from "@/shared/styles/main.module.scss";

export const Main = () => {
    return (
        <Container size="100%" px={0} py={60}>
            <Stack gap={100}>
                <Stack gap="xl" mx={40}>
                    <Title order={1}>Подобрать запчасти:</Title>
                    <Tabs defaultValue="carBrand" classNames={{root: styles.tabsDiv}}>
                        <Tabs.List classNames={{list: styles.tabs}}>
                            <Tabs.Tab classNames={{tab: styles.tab}} value="carBrand">По марке авто</Tabs.Tab>
                            <Tabs.Tab classNames={{tab: styles.tab}} value="vin">По VIN-номеру</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel classNames={{panel: styles.panel}} value="carBrand">
                            <Stack gap="md">
                                <Group grow>
                                    <Select classNames={{input: styles.input}} placeholder="Марка авто"></Select>
                                    <Select classNames={{input: styles.input}} placeholder="Модель авто"></Select>
                                </Group>
                                <Group gap="sm">
                                    <Button classNames={{
                                        root: styles.submitBtn
                                    }} leftSection={
                                        <IconSearch></IconSearch>
                                    }>Поиск</Button>
                                    <Button variant="outline" classNames={{
                                        root: styles.clearBtn
                                    }} leftSection={
                                        <IconTrash></IconTrash>
                                    }>Очистить</Button>
                                </Group>
                            </Stack>
                        </Tabs.Panel>
                        <Tabs.Panel classNames={{panel: styles.panel}} value="vin">
                            <Stack gap="md">
                                <TextInput flex={1} classNames={{input: styles.input}} placeholder="VIN-номер"></TextInput>
                                <Group gap="sm">
                                    <Button classNames={{
                                        root: styles.submitBtn
                                    }} leftSection={
                                        <IconSearch></IconSearch>
                                    }>Поиск</Button>
                                    <Button variant="outline" classNames={{
                                        root: styles.clearBtn
                                    }} leftSection={
                                        <IconTrash></IconTrash>
                                    }>Очистить</Button>
                                </Group>
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Stack>
                <Stack gap="xl" classNames={{root: styles.whyUsDiv}}>
                    <Title order={2} classNames={{root: styles.whyUsTxt}}>Почему мы?</Title>
                </Stack>
            </Stack>
        </Container>
    )
}