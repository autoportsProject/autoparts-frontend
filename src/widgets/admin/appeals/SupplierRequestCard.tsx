import { AppealsRepo } from "@/data/repos/AppealsRepo";
import { AppealStatus, SupplierRequestDto } from "@/domain";
import { useUpdateAppealStatus } from "@/features/appeals/useUpdateAppealStatus";
import styles from "@/shared/styles/admin/appeals/supplier-request.module.scss";
import { getStatusColor, getCategoryLabel } from "@/shared/utils/appealHelpers";
import { Stack, Group, Title, Select, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

interface CardProps {
    request: SupplierRequestDto;
}

const repo = new AppealsRepo();

export const SupplierRequestCard = ({request}: CardProps) => {
    const updateStatus = useUpdateAppealStatus(repo);
    const [status, setStatus] = useState(request.status);
    return (
        <Stack classNames={{root: styles.card}}>
            <Group justify="space-between">
                <Title order={1}>Вопрос №{request.number}</Title>
                <Select label="Статус" value={status} onChange={
                    (x) => {
                        if (!x) return;

                        setStatus(x as AppealStatus);
                        updateStatus.mutate({
                            id: request.id,
                            req: {status: x as AppealStatus}
                        });
                    }
                } data={[
                    {value: AppealStatus.New, label: "Новое"},
                    {value: AppealStatus.Accepted, label: "В работе"},
                    {value: AppealStatus.Completed, label: "Завершено"},
                    {value: AppealStatus.Cancelled, label: "Отменено"}
                ]} classNames={{input: `${styles.input} ${styles[getStatusColor(status)]}`}} rightSection={
                    <IconChevronDown color="white"></IconChevronDown>
                }></Select>
            </Group>
            <Stack gap={8}>
                <Text classNames={{root: styles.info}}>Создано: <span>{dayjs(request.createdAt).format("DD.MM.YYYY в HH:mm")}</span></Text>
                <Text classNames={{root: styles.info}}>Компания: <span>{request.companyName}</span></Text>
                <Text classNames={{root: styles.info}}>Телефон: <span>{request.contactPhone}</span></Text>
                <Text classNames={{root: styles.info}}>Email: <span>{request.contactEmail}</span></Text>
                <Text classNames={{root: styles.info}}>Комментарий менеджера: <span>{request.managerComment || "Нет"}</span></Text>
            </Stack>
        </Stack>
    )
}