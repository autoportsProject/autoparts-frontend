import { Button, Center, Container, Divider, Group, Loader, Modal, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import styles from "@/shared/styles/admin/company/company.module.scss";
import { CompanyRepo } from "@/data/repos/CompanyRepo";
import { useCompany } from "@/features/company/useCompany";
import { getErrorMessage } from "@/shared/utils/getError";
import { useForm } from "react-hook-form";
import { UpdateCompanyInfoFormValues, updateCompanyInfoSchema } from "@/domain/schemas/admin/company/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCompany } from "@/features/company/useUpdateCompany";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { ContactsRepo } from "@/data/repos/ContactsRepo";
import { AddContactFormValues, addContactSchema } from "@/domain/schemas/admin/company/contact";
import { useCreateContact } from "@/features/company/contacts/useCreateContact";
import { ContactCard } from "./ContactCard";

const repo = new CompanyRepo();
const cRepo = new ContactsRepo();

export const AdminCompanyMain = () => {
    const {company, isLoading: isCompanyLoading, serverError} = useCompany(repo);

    const [modalOpened, setModalOpened] = useState(false); // создание контакта

    const create = useCreateContact(cRepo);
    const update = useUpdateCompany(repo);

    const form = useForm<UpdateCompanyInfoFormValues>({
        defaultValues: {
            name: "",
            description: undefined,
            address: undefined
        },
        resolver: zodResolver(updateCompanyInfoSchema)
    });
    const addContactForm = useForm<AddContactFormValues>({
        defaultValues: {
            name: "",
            description: undefined
        },
        resolver: zodResolver(addContactSchema)
    });
    const onSubmit = (data: UpdateCompanyInfoFormValues) => {
        update.mutate({
            name: data.name,
            description: data.description,
            address: data.address
        });
        form.reset();
    }
    const onSaveContact = (data: AddContactFormValues) => {
        create.mutate(data);
        setModalOpened(false);
        addContactForm.reset();
    }
    useEffect(() => {
        if (company) {
            form.reset({
                name: company.name,
                description: company.description,
                address: company.address
            })
        }
    }, [form, company]);
    const isLoading = isCompanyLoading;
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={45}>
                <Stack gap="sm" px={40}>
                    <AdminLinkText></AdminLinkText>
                    <Title order={1} ta="center">Информация о компании</Title>
                </Stack>
                {isLoading ? (
                    <Center py="xl">
                        <Loader size="xl"></Loader>
                    </Center>
                ) : (serverError || !company) ? (
                    <Text c="red" fw={700} ta="center">Ошибка загрузки информации о компании {serverError && getErrorMessage(serverError)}</Text>
                ) : (
                    <Stack classNames={{root: styles.form}}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap="md">
                                <TextInput classNames={{
                                    input: styles.input
                                }} label="Название" {...form.register("name")} error={
                                    form.formState.errors.name?.message
                                }></TextInput>
                                <Textarea classNames={{
                                    input: `${styles.input} ${styles.textarea}`
                                }} label="Описание (опционально)" {...form.register("description")} error={
                                    form.formState.errors.description?.message
                                }></Textarea>
                                <TextInput classNames={{
                                    input: styles.input
                                }} label="Адрес (опционально)" {...form.register("address")} error={
                                    form.formState.errors.address?.message
                                }></TextInput>
                                <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить информацию</Button>
                            </Stack>
                        </form>
                        <Divider size="3px" color="lightgray"></Divider>
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Title order={2}>Контакты</Title>
                                <Button h={44} leftSection={
                                    <IconPlus></IconPlus>
                                } onClick={() => setModalOpened(true)}>Добавить</Button>
                            </Group>
                            <Stack gap="xs">
                                {company.contacts.map(c => (
                                    <ContactCard key={c.id} contact={c}></ContactCard>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </Stack>
            <Modal title="Добавление контакта" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={addContactForm.handleSubmit(onSaveContact)}>
                    <Stack gap="md">
                        <TextInput label="Название (опционально)" classNames={{
                            input: styles.input
                        }} {...addContactForm.register("description")} error={
                            addContactForm.formState.errors.description?.message
                        }></TextInput>
                        <TextInput label="Значение (например номер телефона)" classNames={{
                            input: styles.input
                        }} {...addContactForm.register("name")} error={
                            addContactForm.formState.errors.name?.message
                        }></TextInput>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Добавить контакт</Button>
                    </Stack>
                </form>
            </Modal>
        </Container>
    )
}