import { AppealsRepo } from "@/data/repos/AppealsRepo";
import { AppealStatus, ClientQuestionDto } from "@/domain"
import { useUpdateAppealStatus } from "@/features/appeals/useUpdateAppealStatus";
import styles from "@/shared/styles/admin/appeals/client-question.module.scss";
import { getCategoryLabel, getStatusColor, getStatusLabel } from "@/shared/utils/appealHelpers";
import { Badge, Group, Select, Stack, Text, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

interface CardProps {
    question: ClientQuestionDto;
}

const repo = new AppealsRepo();

export const ClientQuestionCard = ({question}: CardProps) => {
    const updateStatus = useUpdateAppealStatus(repo);
    const [status, setStatus] = useState(question.status);
    return (
        <Stack classNames={{root: styles.card}}>
            <Group justify="space-between">
                <Title order={1}>Вопрос №{question.number}</Title>
                <Select label="Статус" value={status} onChange={
                    (x) => {
                        if (!x) return;

                        setStatus(x as AppealStatus);
                        updateStatus.mutate({
                            id: question.id,
                            req: {status: x as AppealStatus}
                        });
                    }
                } data={[
                    {value: AppealStatus.New, label: "Новое"},
                    {value: AppealStatus.Accepted, label: "В работе"},
                    {value: AppealStatus.Completed, label: "Завершено"},
                    {value: AppealStatus.Cancelled, label: "Отменено"}
                ]} classNames={{input: `${styles.input} ${styles[getStatusColor(status)]}`}} rightSection={
                    <IconChevronDown color={
                        (status !== AppealStatus.Cancelled && status !== AppealStatus.New) ? "black" : "white"
                    }></IconChevronDown>
                }></Select>
            </Group>
            <Stack gap={8}>
                <Text classNames={{root: styles.info}}>Создано: <span>{dayjs(question.createdAt).format("DD.MM.YYYY в HH:mm")}</span></Text>
                <Text classNames={{root: styles.info}}>Категория: <span>{getCategoryLabel(question.category)}</span></Text>
                <Text classNames={{root: styles.info}}>Телефон: <span>{question.contactPhone}</span></Text>
                <Text classNames={{root: styles.info}}>Email: <span>{question.contactEmail}</span></Text>
                <Text classNames={{root: styles.info}}>Комментарий менеджера: <span>{question.managerComment || "Нет"}</span></Text>
            </Stack>
        </Stack>
    )
}