"use client";

import { Anchor, Box, Center, Group, SimpleGrid, Stack, Text } from "@mantine/core"
import styles from "@/shared/styles/footer/footer.module.scss";
import { useRouter } from "next/navigation";
import { IconClock, IconMapPin, IconPhone } from "@tabler/icons-react";

const links = [
    { label: "Каталог", href: "/catalog" },
    { label: "Новости", href: "/news" },
    { label: "Акции", href: "/discounts" },
    { label: "О компании", href: "/about" },
    { label: "Поставщикам", href: "/for_suppliers" },
    { label: "Контакты", href: "/contacts" },
];

export const Footer = () => {
    const nav = useRouter();
    return (
        <Box className={styles.footer}>
            <Center>
                <Stack justify="center">
                    <SimpleGrid cols={3} spacing={75} classNames={{root: styles.grid}}>
                        <Stack gap="md">
                            <Text size="24px" fw={600} c="white">АвтоИноМир</Text>
                            <Text c="rgba(255,255,255,0.6)" fw={500} maw={280} lh={1.7}>Продажа автозапчастей для иномарок в г. Томске. Более 40 000 позиций в каталоге.</Text>
                        </Stack>
                        <Stack gap={8}>
                            <Text size="xs" fw={500} c="rgba(255,255,255,0.45)" tt="uppercase" lts="0.08em" mb={6}>Разделы</Text>
                            {links.map(l => (
                                <Anchor key={l.href} c="rgba(255,255,255,0.8)" size="sm" onClick={() => nav.push(l.href)} style={{cursor: "pointer"}}>
                                    {l.label}
                                </Anchor>
                            ))}
                        </Stack>
                        <Stack gap={10}>
                            <Text size="xs" fw={500} c="rgba(255,255,255,0.45)" tt="uppercase" style={{letterSpacing: "0.08em"}} mb={6}>Контакты</Text>
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
                    </SimpleGrid>
                    <Box px={48} py={4} className={styles.bottom}>
                        <Text size="lg" ta="center" c="rgba(255,255,255,0.4)">© 2026 АвтоИноМир. Все права защищены.</Text>
                    </Box>
                </Stack>
            </Center>
        </Box>
    )
}