import { Stack, Text, Title } from "@mantine/core";
import styles from "@/shared/styles/main.module.scss";

interface CardProps {
    title: string;
    description?: string;
}

export const ReasonCard = ({title, description}: CardProps) => {
    return (
        <Stack classNames={{root: styles.reasonDiv}}>
            <Title order={2}>{title}</Title>
            <Text classNames={{root: styles.reasonDescr}}>{description || "а что говорить"}</Text>
        </Stack>
    )
}