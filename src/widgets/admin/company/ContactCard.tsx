import { ContactsRepo } from "@/data/repos/ContactsRepo";
import { ContactDto } from "@/domain";
import { UpdateContactFormValues, updateContactSchema } from "@/domain/schemas/admin/company/contact";
import { useUpdateContact } from "@/features/company/contacts/useUpdateContact";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/shared/styles/admin/company/company.module.scss";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDeleteContact } from "@/features/company/contacts/useDeleteContact";

interface CardProps {
    contact: ContactDto;
}

const repo = new ContactsRepo();

export const ContactCard = ({contact}: CardProps) => {
    const [modalOpened, setModalOpened] = useState(false);
    const update = useUpdateContact(repo);
    const del = useDeleteContact(repo);
    const form = useForm<UpdateContactFormValues>({
        defaultValues: {
            name: "",
            description: undefined
        },
        resolver: zodResolver(updateContactSchema)
    });
    const onSubmit = (data: UpdateContactFormValues) => {
        update.mutate({
            id: contact.id,
            req: data
        });
        setModalOpened(false);
        form.reset();
    }
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этот контакт?"))
            del.mutate(id);
    }
    useEffect(() => {
        if (contact) {
            form.reset({
                name: contact.name,
                description: contact.description
            });
        }
    }, [contact, form]);
    return (
        <Stack classNames={{root: styles.contactDiv}}>
            <Group justify="space-between">
                <Stack>
                    <Title order={2} classNames={{root: styles.name}}>{contact.description || "Нет названия"}</Title>
                    <Text c="dimmed" classNames={{root: styles.value}}>{contact.name}</Text>
                </Stack>
                <Stack>
                    <Button h={44} bg="green" leftSection={
                        <IconPencil></IconPencil>
                    } onClick={() => setModalOpened(true)}>Редактировать контакт</Button>
                    <Button h={44} bg="red" leftSection={
                        <IconTrash></IconTrash>
                    } onClick={() => onDelete(contact.id)}>Удалить контакт</Button>
                </Stack>
            </Group>
            <Modal title="Изменение контакта" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput label="Название (опционально)" classNames={{
                            input: styles.input
                        }} {...form.register("description")} error={
                            form.formState.errors.description?.message
                        }></TextInput>
                        <TextInput label="Значение (например номер телефона)" classNames={{
                            input: styles.input
                        }} {...form.register("name")} error={
                            form.formState.errors.name?.message
                        }></TextInput>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить контакт</Button>
                    </Stack>
                </form>
            </Modal>
        </Stack>
    )
}