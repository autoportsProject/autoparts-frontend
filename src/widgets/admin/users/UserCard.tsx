import { ProfileDto, UserRole } from "@/domain"
import { ActionIcon, Button, Divider, Group, InputBase, Modal, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import styles from "@/shared/styles/contentCard/user.module.scss";
import { IconPencil, IconTrash, IconUserCog } from "@tabler/icons-react";
import dayjs from "dayjs";
import { getRoleLabel } from "@/features/users/getRoleLabel";
import { useUpdateRole } from "@/features/users/useUpdateRole";
import { UsersRepo } from "@/data/repos/UsersRepo";
import { useUpdateUser } from "@/features/users/useUpdateUser";
import { useDeleteUser } from "@/features/users/useDeleteUser";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AddUserFormValues, addUserSchema, UpdateUserFormValues, UpdateUserRoleFormValues, updateUserRoleSchema, updateUserSchema } from "@/domain/schemas/admin/users/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { useCreateUser } from "@/features/users/useCreateUser";

interface CardProps {
    user: ProfileDto;
}

const repo = new UsersRepo();

export const UserCard = ({user}: CardProps) => {
    const [roleModalOpened, setRoleModalOpened] = useState(false);
    const [modalOpened, setModalOpened] = useState(false); // для обновления пользователя

    
    const updateRole = useUpdateRole(repo);
    const update = useUpdateUser(repo);
    const del = useDeleteUser(repo);

    const roleForm = useForm<UpdateUserRoleFormValues>({
        defaultValues: {
            role: UserRole.Client
        },
        resolver: zodResolver(updateUserRoleSchema)
    });
    const form = useForm<UpdateUserFormValues>({
        defaultValues: {
            name: "",
            phoneNumber: undefined
        },
        resolver: zodResolver(updateUserSchema)
    });

    useEffect(() => {
        if (user) {
            roleForm.reset({
                role: user.role
            });
        }
    }, [roleForm, user]);
    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                phoneNumber: user.phoneNumber
            });
        }
    }, [form, user]);

    const onUpdateRole = (data: UpdateUserRoleFormValues) => {
        updateRole.mutate({
            id: user.id,
            req: data
        });
        setRoleModalOpened(false);
        roleForm.reset();
    }
    const onUpdateUser = (data: UpdateUserFormValues) => {
        update.mutate({
            id: user.id,
            req: data
        });
        setModalOpened(false);
        form.reset();
    }
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этого пользователя?"))
            del.mutate(id);
    }
    return (
        <>
            <Stack gap="md" classNames={{root: styles.userCard}}>
                <Group justify="space-between">
                    <Title order={1} classNames={{root: styles.h1}}>{user.name}</Title>
                    <Group gap={8}>
                        <Button h={44} classNames={{
                            root: styles.changeRoleBtn
                        }} leftSection={<IconUserCog></IconUserCog>} onClick={
                            () => setRoleModalOpened(true)
                        }>Сменить роль</Button>
                        <ActionIcon size="xl" onClick={
                            () => setModalOpened(true)
                        } color="green">
                            <IconPencil></IconPencil>
                        </ActionIcon>
                        <ActionIcon size="xl" onClick={
                            () => onDelete(user.id)
                        } color="red">
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
            <Modal title="Смена роли пользователю" opened={roleModalOpened} onClose={() => setRoleModalOpened(false)}>
                <form onSubmit={roleForm.handleSubmit(onUpdateRole)}>
                    <Stack gap="md">
                        <Controller control={roleForm.control} name="role" render={({field}) => (
                            <Select label="Роль" classNames={{
                                input: styles.input
                            }} data={[
                                {label: "Администратор", value: UserRole.Admin},
                                {label: "Редактор", value: UserRole.Creator},
                                {label: "Пользователь", value: UserRole.Client}
                            ]} {...field} error={roleForm.formState.errors.role?.message}></Select>
                        )}></Controller>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить роль</Button>
                    </Stack>
                </form>
            </Modal>
            <Modal title="Обновление пользователя" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onUpdateUser)}>
                    <Stack gap="md">
                        <TextInput label="Имя пользователя" classNames={{
                            input: styles.input
                        }} {...form.register("name")} error={
                            form.formState.errors.name?.message
                        }></TextInput>
                        <Controller control={form.control} name="phoneNumber" render={({field}) => (
                            <InputBase component={IMaskInput} classNames={{
                                input: styles.input
                            }} {...field} label="Номер телефона"></InputBase>
                        )}></Controller>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить пользователя</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}