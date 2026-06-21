"use client";

import { Anchor, Box, Group, Stack, Text } from "@mantine/core"
import styles from "@/shared/styles/footer/footer.module.scss";
import { useRouter } from "next/navigation";
import { IconClock, IconMapPin, IconPhone } from "@tabler/icons-react";
import { UsersRepo } from "@/data/repos/UsersRepo";
import { useProfile } from "@/features/users/useProfile";
import { UserRole } from "@/domain";

const links = [
    { label: "Администрирование", href: "/admin", admin: true },
    { label: "Каталог", href: "/catalog", admin: false },
    { label: "Новости", href: "/news", admin: false },
    { label: "Акции", href: "/discounts", admin: false },
    { label: "О компании", href: "/about", admin: false },
    { label: "Поставщикам", href: "/for_suppliers", admin: false },
    { label: "Контакты", href: "/contacts", admin: false },
];

const repo = new UsersRepo();

export const Footer = () => {
    const {profile} = useProfile(repo);
    const nav = useRouter();
    return (
        <Box className={styles.footer}>
            <Stack justify="center" classNames={{root: styles.inner}}>
                <Group justify="space-between" align="flex-start" classNames={{root: styles.grid}} w="100%">
                    <Stack gap="md" maw={280}>
                        <Text classNames={{root: styles.companyName}}>АвтоИноМир</Text>
                        <Text classNames={{root: styles.companyDescr}}>Продажа автозапчастей для иномарок в г. Томске. Более 40 000 позиций в каталоге.</Text>
                    </Stack>
                    <Stack gap={8}>
                        <Text classNames={{root: styles.sectionTitle}} mb={6}>Разделы</Text>
                        {links.map(l => l.admin ? (profile?.role === UserRole.Admin || profile?.role === UserRole.Creator) && (
                            <Anchor key={l.href} classNames={{root: styles.link}} style={{cursor: "pointer"}} onClick={() => nav.push(l.href)}>
                                {l.label}
                            </Anchor>
                        ) : (
                            <Anchor key={l.href} classNames={{root: styles.link}} style={{cursor: "pointer"}} onClick={() => nav.push(l.href)}>
                                {l.label}
                            </Anchor>
                        ))}
                    </Stack>
                    <Stack gap={10}>
                        <Text classNames={{root: styles.sectionTitle}} mb={6}>Контакты</Text>
                        <Group gap={8} align="flex-start">
                            <IconMapPin size={16} color="rgba(255,255,255,0.5)" style={{marginTop: 2, flexShrink: 0}} />
                            <Text size="sm" c="rgba(255,255,255,0.8)">г. Томск, ул. Смирнова 44/2</Text>
                        </Group>
                        <Group gap={8}>
                            <IconPhone size={16} color="rgba(255,255,255,0.5)" />
                            <Text size="sm" c="rgba(255,255,255,0.8)">+7 (961) 888-89-57</Text>
                        </Group>
                        <Group gap={8}>
                            <IconClock size={16} color="rgba(255,255,255,0.5)" />
                            <Text size="sm" c="rgba(255,255,255,0.8)">Пн–Пт: 9:00–18:00</Text>
                        </Group>
                    </Stack>    
                </Group>
                <Box px={48} py={4} className={styles.bottom}>
                    <Text classNames={{root: styles.copyright}}>© 2026 АвтоИноМир. Все права защищены.</Text>
                </Box>
            </Stack>
        </Box>
    )
}