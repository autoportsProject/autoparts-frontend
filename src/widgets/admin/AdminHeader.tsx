"use client";

import { Box, Button, Center, Group, Image, Loader, Menu, MenuDropdown, MenuItem, MenuTarget, Stack, Text } from "@mantine/core"
import { IconChevronDown, IconMapPin, IconUser } from "@tabler/icons-react"
import styles from "@/shared/styles/header/header.module.scss";
import { useRouter } from "next/navigation";
import { UsersRepo } from "@/data/repos/UsersRepo";
import { useAuthCheck } from "@/features/auth/useAuthCheck";
import { getErrorMessage } from "@/shared/utils/getError";
import { UserRole } from "@/domain";
import { useEffect } from "react";
import { normalizeRole } from "@/shared/utils/normalizeRole";

const repo = new UsersRepo();

const pages = [
    { label: "Категории", href: "/admin/categories", admin: false },
    { label: "Бренды", href: "/admin/brands", admin: false },
    { label: "Новости", href: "/admin/news", admin: false },
    { label: "Акции", href: "/admin/discount", admin: false },
    { label: "О компании", href: "/admin/company", admin: false },
    { label: "Поставщикам", href: "/admin/for_suppliers", admin: false },
    { label: "Пользователи", href: "/admin/users", admin: true },
    { label: "Обращения", href: "/admin/appeals", admin: true }
];

export const AdminHeader = () => {
    const nav = useRouter();
    const {authorized, user, isLoading, serverError} = useAuthCheck(repo);
    useEffect(() => {
        if (isLoading) return;
        if (!user) {
            nav.push("/");
            return;
        }

        const role = normalizeRole(user.role);
        if (role !== UserRole.Admin && role !== UserRole.Creator)
            nav.push("/");
    }, [user, isLoading]);
    return (
        <Stack gap={0}>
            {(!isLoading && (serverError || !user)) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки профиля {serverError ? `(${getErrorMessage(serverError)})` : ""}</Text>
            ) : (
                <>
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
                    <Group justify="space-between" align="center">
                        <Group classNames={{root: styles.companyGroup}} onClick={() => nav.push("/")}>
                            <Image w={50} h={50} radius="50%" src="/favicon.ico"></Image>
                            <Text classNames={{root: styles.companyName}}>АвтоИноМир</Text>
                        </Group>
                        <Text fw={700} ta="center" size="40px" c="white" td="underline">Страница Администратора</Text>
                        <Group gap="sm">
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
                                            nav.push("/");
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
                    {pages.map(p => (
                        p.admin ? (user?.role === UserRole.Admin) && (
                            <Button key={p.href} variant="subtle" onClick={() => nav.push(p.href)}>{p.label}</Button>
                        ) : (
                            <Button key={p.href} variant="subtle" onClick={() => nav.push(p.href)}>{p.label}</Button>
                        )
                    ))}
                </Group>
                </>
            )}
        </Stack>
    )
}