import { Button, Container, TextInput, Group, Stack, Title, Divider, Modal, Center, Loader, Text } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import { CertificatesRepo } from "@/data/repos/CertificatesRepo"
import { useCertificatesList } from "@/features/certificates/useCertificatesList";
import { useCreateCertificate } from "@/features/certificates/useCreateCertificate";
import { AddCertificateFormValues, addCertificateSchema } from "@/domain/schemas/admin/certificates/certificate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/shared/styles/admin/certificates/certificate.module.scss";
import { CertificateCard } from "./CertificateCard";
import { getErrorMessage } from "@/shared/utils/getError";

const repo = new CertificatesRepo();

export const AdminCertificatesMain = () => {
    const {certificates, isLoading, serverError} = useCertificatesList(repo);
    const create = useCreateCertificate(repo);
    const [modalOpened, setModalOpened] = useState(false);
    const [value, setValue] = useState("");
    const [query, setQuery] = useState("");

    const filtered = certificates?.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    const letters = [...new Set(filtered?.map(c => c.name[0].toUpperCase()))]
        .sort((a,b) => a.localeCompare(b, "ru"));

    const form = useForm<AddCertificateFormValues>({
        defaultValues: {
            name: "",
            imagePath: undefined
        },
        resolver: zodResolver(addCertificateSchema)
    });
    const onSubmit = (data: AddCertificateFormValues) => {
        create.mutate(data);
        setModalOpened(false);
        form.reset();
    }
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (serverError || !certificates) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки сертификатов ({serverError && getErrorMessage(serverError)})</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText></AdminLinkText>
                        <Title order={1} ta="center">Сертификаты</Title>
                    </Stack>
                    <Stack gap="md" px={140}>
                        <Button variant="outline" classNames={{
                            root: styles.addBtn
                        }} leftSection="+" onClick={() => setModalOpened(true)}>Добавить бренд</Button>
                        <Group gap="md">
                            <TextInput flex={1} classNames={{
                                input: styles.input
                            }} placeholder="Поиск по названию" value={value} onChange={
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
                                        .map(c => (
                                            <CertificateCard key={c.id} certificate={c}></CertificateCard>
                                        ))}
                                </Group>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            )}
            <Modal title="Создание сертификата" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Название сертификата" error={
                            form.formState.errors.name?.message
                        } withAsterisk></TextInput>
                        <TextInput {...form.register("imagePath")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Ссылка на фото сертификата (URL)" error={
                            form.formState.errors.imagePath?.message
                        }></TextInput>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }} loading={create.isPending}>Создать сертификат</Button>
                    </Stack>
                </form>
            </Modal>
        </Container>
    )
}