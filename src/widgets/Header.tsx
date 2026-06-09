import { ActionIcon, Box, Button, Group, Image, Menu, MenuDropdown, MenuItem, MenuTarget, Stack, Text, TextInput } from "@mantine/core"
import { IconChevronDown, IconMapPin, IconSearch, IconUser } from "@tabler/icons-react"
import styles from "@/shared/styles/header/header.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
    const nav = useRouter();
    const [isAuth, setAuth] = useState(false);
    const [inputOpened, setInputOpened] = useState(false);
    return (
        <Stack gap={0}>
            <Box className={styles.headerUp}>
                <Group gap={5} c="white" justify="space-between">
                    <Group gap="sm">
                        <IconMapPin></IconMapPin>
                        <Text>здесь будет адрес</Text>
                    </Group>
                    <Group gap="sm">
                        <Text>Тел:</Text>
                        <Text>+7 800 555-35-35</Text>
                    </Group>
                </Group>
            </Box>
            <Box className={styles.headerMain}>
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <Image w={50} h={50} radius="50%" src="../favicon.ico"></Image>
                        <Text classNames={{root: styles.companyName}}>здесь имя компании</Text>
                    </Group>
                    <TextInput classNames={{
                        input: styles.searchInput,
                        section: styles.searchSection
                    }} placeholder="Найти запчасти по названию, VIN или артикулу" rightSection={
                        <ActionIcon variant="filled" classNames={{
                            root: styles.searchIcon
                        }} size={40} aria-label="Поиск">
                            <IconSearch></IconSearch>
                        </ActionIcon>
                    }></TextInput>
                    <TextInput data-visible={inputOpened} classNames={{
                        root: styles.inputMob,
                        input: styles.searchInputMob,
                        section: styles.searchSection
                    }} placeholder="Найти запчасти по названию, VIN или артикулу"></TextInput>
                     <Group gap="sm">
                        <ActionIcon variant="filled" classNames={{
                            root: styles.searchIconMob
                        }} size={40} aria-label="Поиск" onClick={() => setInputOpened(!inputOpened)}>
                            <IconSearch></IconSearch>
                        </ActionIcon>
                        {isAuth ? (
                            <Menu width={200} position="bottom-end">
                                <MenuTarget>
                                    <Button variant="transparent" c="white" rightSection={
                                        <IconChevronDown size={16}></IconChevronDown>
                                    } size="md">
                                        здесь имя
                                    </Button>
                                </MenuTarget>
                                <MenuDropdown>
                                    <MenuItem>Профиль</MenuItem>
                                    <MenuItem onClick={() => setAuth(false)}>Выйти</MenuItem>
                                </MenuDropdown>
                            </Menu>
                        ) : (
                            <>
                                <Button classNames={{root: styles.login}} variant="transparent" onClick={
                                    () => nav.push("/login")
                                } leftSection={<IconUser></IconUser>} c="white">Войти</Button>
                                <Button classNames={{root: styles.loginMob}} variant="transparent" onClick={
                                    () => nav.push("/login")
                                } leftSection={<IconUser></IconUser>} c="white"></Button>
                            </>
                        )}
                    </Group>
                </Group>
            </Box>
        </Stack>
    )
}