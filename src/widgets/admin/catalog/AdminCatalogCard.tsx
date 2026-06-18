import { ActionIcon, Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import styles from "@/shared/styles/admin/category/category.module.scss";
import { useRouter } from "next/navigation";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { CategoryDto } from "@/domain";
import { useDeleteCategory } from "@/features/catalogs/useDeleteCategory";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useUpdateCategory } from "@/features/catalogs/useUpdateCategory";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UpdateCategoryFormValues, updateCategorySchema } from "@/domain/schemas/admin/category/category";
import { zodResolver } from "@hookform/resolvers/zod";

interface CardProps {
    category: CategoryDto;
}

const repo = new CategoriesRepo();

export const AdminCatalogCard = ({category}: CardProps) => {
    const nav = useRouter();
    const [modalOpened, setModalOpened] = useState(false);
    const update = useUpdateCategory(repo);
    const del = useDeleteCategory(repo);
    const form = useForm<UpdateCategoryFormValues>({
        defaultValues: {
            name: ""
        },
        resolver: zodResolver(updateCategorySchema)
    });
    const onSubmit = (data: UpdateCategoryFormValues) => {
        update.mutate({
            id: category.id,
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
        if (category) {
            form.reset({
                name: category.name
            });
        }
    }, [form, category]);
    return (
        <>
            <Group gap="sm" classNames={{root: styles.catalogCard}} onClick={
                () => nav.push(`/admin/categories/${category.id}`)
            }>
                <Text>{category.name}</Text>
                <Stack gap={4}>
                    <ActionIcon size="xl" onClick={
                        (e) => {
                            e.stopPropagation();
                            setModalOpened(true)
                        }
                    } color="green">
                        <IconPencil></IconPencil>
                    </ActionIcon>
                    <ActionIcon size="xl" onClick={
                        (e) => {
                            e.stopPropagation();
                            onDelete(category.id)
                        }
                    } color="red">
                        <IconTrash></IconTrash>
                    </ActionIcon>
                </Stack>
            </Group>
            <Modal title="Изменение категории" opened={modalOpened} onClose={() => setModalOpened(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack gap="md">
                        <TextInput {...form.register("name")} classNames={{
                            input: styles.input
                        }} c="dimmed" label="Название категории" error={
                            form.formState.errors.name?.message
                        }></TextInput>
                        <Button type="submit" classNames={{
                            root: styles.submitBtn
                        }} loading={update.isPending}>Обновить категорию</Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}