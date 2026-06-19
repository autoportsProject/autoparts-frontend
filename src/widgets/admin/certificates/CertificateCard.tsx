import { CertificatesRepo } from "@/data/repos/CertificatesRepo";
import { CertificateDto } from "@/domain"
import { UpdateCertificateFormValues, updateCertificateSchema } from "@/domain/schemas/admin/certificates/certificate";
import { useDeleteCertificate } from "@/features/certificates/useDeleteCertificate";
import { useUpdateCertificate } from "@/features/certificates/useUpdateCertificate";
import styles from "@/shared/styles/admin/certificates/certificate.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface CardProps {
    certificate: CertificateDto;
}

const repo = new CertificatesRepo();

export const CertificateCard = ({certificate}: CardProps) => {
    const [modalOpened, setModalOpened] = useState(false);
    const update = useUpdateCertificate(repo);
    const del = useDeleteCertificate(repo);
    const form = useForm<UpdateCertificateFormValues>({
        defaultValues: {
            name: "",
            imagePath: undefined
        },
        resolver: zodResolver(updateCertificateSchema)
    });
    const onSubmit = (data: UpdateCertificateFormValues) => {
        update.mutate({
            id: certificate.id,
            req: data
        });
        setModalOpened(false);
        form.reset();
    }
    const onDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту категорию?"))
            del.mutate(id);
    }
    useEffect(() => {
        if (certificate) {
            form.reset({
                name: certificate.name,
                imagePath: certificate.imagePath
            });
        }
    }, [form, certificate]);
    return (
        <Group classNames={{root: styles.brandCard}}>
            <Text   >{certificate.name}</Text>
            <Group justify="space-between">
                <Stack gap={4}>
                    <ActionIcon size="xl" onClick={
                        () => setModalOpened(true)
                    } color="green">
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon size="xl" onClick={
                        () => onDelete(certificate.id)
                    } color="red">
                        <IconTrash></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <Modal title="Изменение сертификата" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Название сертификата" error={
                            form.formState.errors.name?.message
                        }></TextInput>
                        <TextInput {...form.register("imagePath")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Ссылка на фото сертификата (URL)" error={
                            form.formState.errors.imagePath?.message
                        }></TextInput>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }} loading={update.isPending}>Обновить сертификат</Button>
                    </Stack>
                </form>
            </Modal>
        </Group>
    )
}