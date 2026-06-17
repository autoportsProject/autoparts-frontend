import { Button, Center, Container, Divider, Group, InputBase, Loader, Modal, PasswordInput, Select, Stack, Text, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import styles from "@/shared/styles/admin/users/users.module.scss";
import { UsersRepo } from "@/data/repos/UsersRepo";
import { useUsersList } from "@/features/users/useUsersList";
import { getErrorMessage } from "@/shared/utils/getError";
import { useState } from "react";
import { UserCard } from "./UserCard";
import { useCreateUser } from "@/features/users/useCreateUser";
import { UserRole } from "@/domain";
import { AddUserFormValues, addUserSchema } from "@/domain/schemas/admin/users/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

const repo = new UsersRepo();

export const AdminUsersMain = () => {
    const {users, isLoading, serverError} = useUsersList(repo);
    const [modalOpened, setModalOpened] = useState(false);

    const create = useCreateUser(repo);
    const addForm = useForm<AddUserFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: undefined,
            role: UserRole.Client
        },
        resolver: zodResolver(addUserSchema)
    });

    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = users?.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered?.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));

    const onCreateUser = (data: AddUserFormValues) => {
        create.mutate(data);
        setModalOpened(false);
        addForm.reset();
    }
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (serverError || !users) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки пользователей {serverError && getErrorMessage(serverError)}</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText></AdminLinkText>
                        <Title order={1} ta="center">Пользователи</Title>
                    </Stack>
                    <Stack gap="md" px={140}>
                        <Button variant="outline" classNames={{
                            root: styles.addBtn
                        }} leftSection="+" onClick={() => setModalOpened(true)}>Добавить пользователя</Button>
                        <Group gap="md">
                            <TextInput flex={1} classNames={{
                                input: styles.input
                            }} placeholder="Поиск по имени" value={value} onChange={
                                (e) => setValue(e.currentTarget.value)
                            } onKeyDown={
                                (e) => e.key === "Enter" && setQuery(value)
                            }></TextInput>
                            <Button classNames={{
                                root: styles.submitBtn
                            }} w={230} onClick={() => setQuery(value)}>Поиск</Button>
                        </Group>
                    </Stack>
                    <Stack gap="md" px={140}>
                        {letters.map((l,i) => (
                            <Stack key={i} gap="sm">
                                <Title order={3} ml="md">{l}</Title>
                                <Divider size="md" color="blue"></Divider>
                                <Group gap="md" ml="md">
                                    {filtered!
                                        .filter(c => c.name[0].toUpperCase() === l)
                                        .sort((a,b) => a.name.localeCompare(b.name, "ru"))
                                        .map(u => (
                                            <UserCard key={u.id} user={u}></UserCard>
                                        ))}
                                </Group>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            )}
            <Modal title="Создание пользователя" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={addForm.handleSubmit(onCreateUser)}>
                    <Stack gap={8}>
                        <TextInput label="Имя пользователя" classNames={{
                            input: styles.input
                        }} {...addForm.register("name")} error={
                            addForm.formState.errors.name?.message
                        }></TextInput>
                        <TextInput type="email" label="Email пользователя" classNames={{
                            input: styles.input
                        }} {...addForm.register("email")} error={
                            addForm.formState.errors.email?.message
                        }></TextInput>
                        <PasswordInput label="Придумайте пароль (не менее 6 символов)" classNames={{
                            input: styles.input
                        }} {...addForm.register("password")} error={
                            addForm.formState.errors.password?.message
                        }></PasswordInput>
                        <Controller control={addForm.control} name="phoneNumber" render={({field}) => (
                            <InputBase component={IMaskInput} classNames={{
                                input: styles.input
                            }} mask="+7 (000) 000-00-00" {...field} label="Номер телефона (опционально)" error={
                                addForm.formState.errors.phoneNumber?.message
                            }></InputBase>
                        )}></Controller>
                        <Controller control={addForm.control} name="role" render={({field}) => (
                            <Select label="Роль" classNames={{
                                input: styles.input
                            }} data={[
                                {label: "Администратор", value: UserRole.Admin},
                                {label: "Редактор", value: UserRole.Creator},
                                {label: "Пользователь", value: UserRole.Client}
                            ]} {...field} error={addForm.formState.errors.role?.message}></Select>
                        )}></Controller>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }}>Создать пользователя</Button>
                    </Stack>
                </form>
            </Modal>
        </Container>
    )
}