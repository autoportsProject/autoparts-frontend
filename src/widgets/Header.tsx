"use client";

import { ActionIcon, Box, Burger, Button, Divider, Drawer, Group, Image, Menu, MenuDropdown, MenuItem, MenuTarget, Stack, Text, TextInput } from "@mantine/core"
import { IconBolt, IconCar, IconChevronDown, IconDroplet, IconEngine, IconFilter, IconFlame, IconMapPin, IconSearch, IconSettings, IconShoppingCart, IconTool, IconUser } from "@tabler/icons-react"
import styles from "@/shared/styles/header/header.module.scss";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { UsersRepo } from "@/data/repos/UsersRepo";
import { useAuthCheck } from "@/features/auth/useAuthCheck";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useCategoriesList } from "@/features/catalogs/useCategoriesList";
import { useQueryClient } from "@tanstack/react-query";

const repo = new UsersRepo();
const cRepo = new CategoriesRepo();

export const Header = () => {
    const nav = useRouter();
    const queryClient = useQueryClient();
    const {authorized, user} = useAuthCheck(repo);
    const {categories} = useCategoriesList(cRepo);
    const [inputOpened, setInputOpened] = useState(false);
    const [navOpened, setNavOpened] = useState(false);
    const [query, setQuery] = useState("");
    const onSearch = () => {
        if (query.trim())
            nav.push(`/catalog/search?search=${encodeURIComponent(query)}`);
    }
    return (
        <Stack gap={0}>
            <Box className={styles.headerUp}>
                <Group gap={5} c="white" justify="space-between">
                    <Group gap="sm">
                        <IconMapPin></IconMapPin>
                        <Text>г. Томск, ул. Смирнова 44/2</Text>
                    </Group>
                    <Group gap="sm">
                        <Text>Тел:</Text>
                        <Text>+7 (961) 888-89-57</Text>
                    </Group>
                </Group>
            </Box>
            <Box className={styles.headerMain}>
                <Group justify="space-between" align="center" gap="xs">
                    <Group classNames={{root: styles.companyGroup}} onClick={() => nav.push("/")}>
                        <Burger color="white" classNames={{root: styles.burgerNav}} opened={navOpened} onClick={(e) => {
                            e.stopPropagation();
                            setNavOpened(!navOpened);
                        }}></Burger>
                        <Image w={50} h={50} radius="50%" src="../favicon.ico"></Image>
                        <Text classNames={{root: styles.companyName}}>АвтоИноМир</Text>
                    </Group>
                    <TextInput classNames={{
                        input: styles.searchInput,
                        section: styles.searchSection
                    }} placeholder="Найти запчасти по названию/артикулу" onKeyDown={
                        (e) => e.key === "Enter" && onSearch()
                    } rightSection={
                        <ActionIcon variant="filled" classNames={{
                            root: styles.searchIcon
                        }} size={40} aria-label="Поиск" onClick={onSearch}>
                            <IconSearch></IconSearch>
                        </ActionIcon>
                    } value={query} onChange={
                        (e) => setQuery(e.currentTarget.value)
                    }></TextInput>
                    <TextInput data-visible={inputOpened} classNames={{
                        root: styles.inputMob,
                        input: styles.searchInputMob,
                        section: styles.searchSection
                    }} placeholder="Найти запчасти по названию/артикулу" onChange={
                        (e) => setQuery(e.currentTarget.value)
                    } value={query} onKeyDown={
                        (e) => e.key === "Enter" && onSearch()
                    }></TextInput>
                     <Group gap="sm">
                        <ActionIcon variant="filled" onKeyDown={
                            (e) => e.key === "Enter" && onSearch()
                        } classNames={{
                            root: styles.searchIconMob
                        }} size={40} aria-label="Поиск" onClick={() => setInputOpened(!inputOpened)}>
                            <IconSearch></IconSearch>
                        </ActionIcon>
                        {authorized ? (
                            <Menu width={200} position="bottom-end">
                                <MenuTarget>
                                    <Button variant="transparent" c="white" rightSection={
                                        <IconChevronDown size={16}></IconChevronDown>
                                    } size="md">
                                        {user?.name}
                                    </Button>
                                </MenuTarget>
                                <MenuDropdown>
                                    <MenuItem onClick={() => nav.push("/profile")}>Профиль</MenuItem>
                                    <MenuItem onClick={() => {
                                        localStorage.removeItem("token");
                                        queryClient.removeQueries({
                                            queryKey: ["profile"]
                                        });
                                        nav.refresh();
                                    }}>Выйти</MenuItem>
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
            <Group classNames={{root: styles.navBtns}}>
                <Menu width="target" offset={0} position="bottom-start">
                    <MenuTarget>
                        <Button variant="subtle" rightSection={
                            <IconChevronDown size={16}></IconChevronDown>
                        }>Категории</Button>
                    </MenuTarget>
                    <MenuDropdown classNames={{dropdown: styles.categories}}>
                        {categories?.map((c,i) => (
                            <Fragment key={i}>
                                <MenuItem onClick={() => nav.push(`/catalog/${c.id}`)} classNames={{
                                    item: styles.cat
                                }}>{c.name}</MenuItem>
                                {i < categories.length - 1 && <Divider></Divider>}
                            </Fragment>
                        ))}
                    </MenuDropdown>
                </Menu>
                <Button variant="subtle" onClick={() => nav.push("/news")}>Новости</Button>
                <Button variant="subtle" onClick={() => nav.push("/discounts")}>Акции</Button>
                <Button variant="subtle" onClick={() => nav.push("/about")}>О компании</Button>
                <Button variant="subtle" onClick={() => nav.push("/for_suppliers")}>Поставщикам</Button>
                <Button variant="subtle" onClick={() => nav.push("/contacts")}>Контакты</Button>
            </Group>
            <Drawer title="Меню" opened={navOpened} onClose={() => setNavOpened(false)}>
                <Stack gap="xs">
                    <Menu width="target" position="bottom-start">
                        <MenuTarget>
                            <Button variant="subtle" fullWidth rightSection={<IconChevronDown size={16}></IconChevronDown>}>Категории</Button>
                        </MenuTarget>
                        <MenuDropdown classNames={{dropdown: styles.categories}}>
                            {categories?.map((c,i) => (
                                <Fragment key={i}>
                                    <MenuItem onClick={() => { nav.push(`/catalog/${c.id}`); setNavOpened(false); }} classNames={{item: styles.cat}}>{c.name}</MenuItem>
                                    {i < categories.length - 1 && <Divider></Divider>}
                                </Fragment>
                            ))}
                        </MenuDropdown>
                    </Menu>
                    <Button variant="subtle" fullWidth onClick={() => { nav.push("/news"); setNavOpened(false); }}>Новости</Button>
                    <Button variant="subtle" fullWidth onClick={() => { nav.push("/discounts"); setNavOpened(false); }}>Акции</Button>
                    <Button variant="subtle" fullWidth onClick={() => { nav.push("/about"); setNavOpened(false); }}>О компании</Button>
                    <Button variant="subtle" fullWidth onClick={() => { nav.push("/for_suppliers"); setNavOpened(false); }}>Поставщикам</Button>
                    <Button variant="subtle" fullWidth onClick={() => { nav.push("/contacts"); setNavOpened(false); }}>Контакты</Button>
                </Stack>
            </Drawer>
        </Stack>
    )
}