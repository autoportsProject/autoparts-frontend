import { ProfileDto } from "@/domain"
import { ActionIcon, Divider, Group, Stack, Text, Title } from "@mantine/core";
import styles from "@/shared/styles/contentCard/user.module.scss";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { normalizeRole } from "@/shared/utils/normalizeRole";
import { getRoleLabel } from "@/features/users/getRoleLabel";

interface CardProps {
    user: ProfileDto;
}

export const UserCard = ({user}: CardProps) => {
    return (
        <Stack gap="md" classNames={{root: styles.userCard}}>
            <Group justify="space-between">
                <Title order={1} classNames={{root: styles.h1}}>{user.name}</Title>
                <Group gap={8}>
                    <ActionIcon size="xl" color="green">
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon size="xl" color="red">
                        <IconTrash></IconTrash>
                    </ActionIcon>
                </Group>
            </Group>
            <Divider color="lightgray" size="5px"></Divider>
            <Stack gap={8}>
                <Text c="dimmed" classNames={{root: styles.info}}>Дата регистрации: <span>{dayjs(user.createdAt).format("DD.MM.YYYY в HH:mm")}</span></Text>
                <Text c="dimmed" classNames={{root: styles.info}}>Роль: <span><strong>{getRoleLabel(user.role)}</strong></span></Text>
                <Text c="dimmed" classNames={{root: styles.info}}>Email: <span>{user.email}</span></Text>
                <Text c="dimmed" classNames={{root: styles.info}}>Номер телефона: <span>{user.phoneNumber ?? "Нет"}</span></Text>
            </Stack>
        </Stack>
    )
}