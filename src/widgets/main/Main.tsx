import { Container, Stack, Title, Tabs, Group, Select, Button, TextInput, SimpleGrid, Image, Box } from "@mantine/core"
import { IconSearch, IconTrash } from "@tabler/icons-react"
import styles from "@/shared/styles/main.module.scss";
import { ReasonCard } from "@/ui/main/ReasonCard";

export const Main = () => {
    return (
        <Container size="100%" px={0} py={60}>
            <Stack gap={100}>
                <Stack gap="xl" px={40}>
                    <Title order={1}>Подобрать запчасти:</Title>
                    <Tabs defaultValue="carBrand" classNames={{root: styles.tabsDiv}}>
                        <Tabs.List classNames={{list: styles.tabs}}>
                            <Tabs.Tab classNames={{tab: styles.tab}} value="carBrand">По марке техники</Tabs.Tab>
                            <Tabs.Tab classNames={{tab: styles.tab}} value="vin">По VIN-номеру</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel classNames={{panel: styles.panel}} value="carBrand">
                            <Stack gap="md">
                                <Group grow>
                                    <Select classNames={{input: styles.input}} placeholder="Марка техники"></Select>
                                    <Select classNames={{input: styles.input}} placeholder="Модель техники"></Select>
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
                    <Group justify="space-between">
                        <SimpleGrid w="70%" cols={2} spacing="lg">
                            {[1,2,3,4].map(i => (
                                <ReasonCard key={i} title={`Название ${i}`} description={
                                    `Это тестирование описания №${i} для карточки №${i}`
                                }></ReasonCard>
                            ))}
                        </SimpleGrid>
                        <Image w={400} h={230} fit="fill" onClick={
                            () => alert("Это картинка для теста")
                        } src="https://hagleysbeauty.com/wp-content/uploads/2023/03/test-button-1.jpg"></Image>
                    </Group>
                </Stack>
                <Stack gap="xl">
                    <Title order={2} ml={40}>Бренды</Title>
                    <Box className={styles.brandsTrack}>
                        <Group gap={40} classNames={{root: styles.brandsDiv}}>
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                                <Image key={i} classNames={{root: styles.brandLogo}}></Image>
                            ))}
                        </Group>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}