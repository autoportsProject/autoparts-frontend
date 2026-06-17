import { Button, Center, Container, Divider, Group, Loader, Stack, Text, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import styles from "@/shared/styles/admin/users/users.module.scss";
import { UsersRepo } from "@/data/repos/UsersRepo";
import { useUsersList } from "@/features/users/useUsersList";
import { getErrorMessage } from "@/shared/utils/getError";
import { useState } from "react";
import { UserCard } from "./UserCard";

const repo = new UsersRepo();

export const AdminUsersMain = () => {
    const {users, isLoading, serverError} = useUsersList(repo);

    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = users?.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered?.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));
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
                        }} leftSection="+">Добавить пользователя</Button>
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
        </Container>
    )
}