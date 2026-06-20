import { AppealsRepo } from "@/data/repos/AppealsRepo";
import { AppealStatus, SupplierRequestDto } from "@/domain";
import { UpdateContactsFormValues, updateContactsSchema } from "@/domain/schemas/admin/appeals/appeal";
import { useUpdateAppealContacts } from "@/features/appeals/useUpdateAppealContacts";
import { useUpdateAppealStatus } from "@/features/appeals/useUpdateAppealStatus";
import styles from "@/shared/styles/admin/appeals/supplier-request.module.scss";
import { getStatusColor, getCategoryLabel } from "@/shared/utils/appealHelpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Group, Title, Select, Text, Button, InputBase, Modal, TextInput } from "@mantine/core";
import { IconChevronDown, IconPencil } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface CardProps {
    request: SupplierRequestDto;
}

const repo = new AppealsRepo();

export const SupplierRequestCard = ({request}: CardProps) => {
    const updateStatus = useUpdateAppealStatus(repo);
    const updateContacts = useUpdateAppealContacts(repo);
    const [status, setStatus] = useState(request.status);
    const [modalOpened, setModalOpened] = useState(false);

    const form = useForm<UpdateContactsFormValues>({
        defaultValues: {
            contactEmail: undefined,
            contactPhone: undefined
        },
        resolver: zodResolver(updateContactsSchema)
    });
    const onSaveContacts = (data: UpdateContactsFormValues) => {
        updateContacts.mutate({
            id: request.id,
            req: data
        });
        setModalOpened(false);
        form.reset();
    }
    useEffect(() => {
        if (request) {
            form.reset({
                contactEmail: request.contactEmail,
                contactPhone: request.contactPhone
            });
        }
    }, [form, request]);
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
                <Group justify="space-between">
                    <Text classNames={{root: styles.info}}>Телефон: <span>{request.contactPhone}</span></Text>
                    <Button onClick={() => setModalOpened(true)} classNames={{
                        root: styles.submitBtn
                    }} leftSection={<IconPencil></IconPencil>}>Изменить контакты</Button>
                </Group>
                <Text classNames={{root: styles.info}}>Email: <span>{request.contactEmail}</span></Text>
                <Text classNames={{root: styles.info}}>Комментарий: <span><strong>{request.managerComment || "Нет"}</strong></span></Text>
            </Stack>
            <Modal title="Изменение контактов" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSaveContacts)}>
                    <Stack gap="md">
                        <TextInput type="email" label="Email" {...form.register("contactEmail")} error={
                            form.formState.errors.contactEmail?.message
                        } classNames={{input: styles.input}}></TextInput>
                        <Controller control={form.control} name="contactPhone" render={({field}) => (
                            <InputBase component={IMaskInput} mask="+7 (000) 000-00-00" {...field} error={
                                form.formState.errors.contactPhone?.message
                            } classNames={{input: styles.input}} label="Номер телефона"></InputBase>
                        )}></Controller>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить контакты</Button>
                    </Stack>
                </form>
            </Modal>
        </Stack>
    )
}