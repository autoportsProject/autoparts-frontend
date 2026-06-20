import { BrandsRepo } from "@/data/repos/BrandsRepo";
import { BrandDto } from "@/domain";
import { UpdateBrandFormValues, updateBrandSchema } from "@/domain/schemas/admin/brands/brand";
import { useDeleteBrand } from "@/features/brands/useDeleteBrand";
import { useUpdateBrand } from "@/features/brands/useUpdateBrand";
import styles from "@/shared/styles/contentCard/brand.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface CardProps {
    brand: BrandDto;
}

const repo = new BrandsRepo();

export const BrandCard = ({brand}: CardProps) => {
    const [modalOpened, setModalOpened] = useState(false);
    const update = useUpdateBrand(repo);
    const del = useDeleteBrand(repo);
    const form = useForm<UpdateBrandFormValues>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(updateBrandSchema)
    });
    const onSubmit = (data: UpdateBrandFormValues) => {
        update.mutate({
            id: brand.id,
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
        if (brand) {
            form.reset({
                name: brand.name
            });
        }
    }, [form, brand]);
    return (
        <Group classNames={{root: styles.brandCard}}>
            <Text>{brand.name}</Text>
            <Group justify="space-between">
                <Stack gap={4}>
                    <ActionIcon size="xl" onClick={
                        () => setModalOpened(true)
                    } color="green">
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon size="xl" onClick={
                        () => onDelete(brand.id)
                    } color="red">
                        <IconTrash></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <Modal title="Изменение бренда" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Название бренда" error={
                            form.formState.errors.name?.message
                        }></TextInput>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }} loading={update.isPending}>Обновить бренд</Button>
                    </Stack>
                </form>
            </Modal>
        </Group>
    )
}