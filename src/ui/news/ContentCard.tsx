import { Stack, Text } from "@mantine/core";
import styles from "@/shared/styles/contentCard/card.module.scss";
import dayjs from "dayjs";

interface CardProps {
    title: string;
    description?: string;
    createdAt: string;
    imagePath?: string;
}

export const ContentCard = ({title, description, createdAt, imagePath}: CardProps) => {
    return (
        <Stack gap="md" classNames={{root: styles.card}}>
            <Text c="dimmed" size="sm">Дата публикации: {dayjs(createdAt).format("DD.MM.YYYY в HH:mm")}</Text>
            <Text classNames={{root: styles.title}}>{title}</Text>
            {imagePath && (
                <img src={imagePath} alt={title} className={styles.cardImg}></img>
            )}
            <Text>{description || "Описания нет, но скоро будет"}</Text>
        </Stack>
    )
}