import { ActionIcon, Button, Center, Container, Group, Loader, Modal, Select, Stack, Table, Text, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../../AdminLinkText"
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useCategoryDetails } from "@/features/catalogs/useCategoryDetails";
import { getErrorMessage } from "@/shared/utils/getError";
import styles from "@/shared/styles/admin/category/category.module.scss";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAttribsListByCategory } from "@/features/attribs/useAttribsList";
import { AttributesRepo } from "@/data/repos/AttributesRepo";
import { AttributeDto } from "@/domain";
import { useState } from "react";
import { useDeleteAttrib } from "@/features/attribs/useDeleteAttrib";
import { getAttribTypeLabel } from "@/shared/utils/attribHelpers";
import { AddAttributeModal } from "./AddAttributeModal";
import { EditAttributeModal } from "./EditAttributeModal";
import { useRouter } from "next/navigation";
import { ProductsRepo } from "@/data/repos/ProductsRepo";
import { useProductsList } from "@/features/products/useProductsList";
import { useDeleteProduct } from "@/features/products/useDeleteProduct";

interface Props {
    id: string;
}

const repo = new CategoriesRepo();
const aRepo = new AttributesRepo();
const pRepo = new ProductsRepo();

export const CatalogMain = ({id}: Props) => {
    const nav = useRouter();
    const {category, isLoading: isCategoryLoading, serverError: categoryError} = useCategoryDetails(id, repo);
    const {attribs, isLoading: areAttribsLoading, serverError: attribsError} = useAttribsListByCategory(id, aRepo);
    const {products, isLoading: areProductsLoading, serverError: productsError} = useProductsList({
        categoryId: id,
        page: 1,
        pageSize: 20,
        sortBy: "name",
        sortOrder: "asc"
    }, pRepo);

    const [editAttr, setEditAttr] = useState<AttributeDto | null>(null);
    
    const [modalOpened, setModalOpened] = useState(false); // для добавления атрибута
    const [updModalOpened, setUpdModalOpened] = useState(false); // для обновления атрибута

    const del = useDeleteAttrib(aRepo);
    const onDeleteAttr = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этот атрибут?"))
            del.mutate(id);
    }

    const delp = useDeleteProduct(pRepo);
    const onDeleteProduct = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этот товар?"))
            delp.mutate(id);
    }

    const isLoading = isCategoryLoading || areAttribsLoading || areProductsLoading;
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (categoryError || !category) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки категории. Вероятно, такой категории не существует ({
                    categoryError
                        ? getErrorMessage(categoryError) : ""
                })</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText></AdminLinkText>
                        <Title order={1} ta="center">Категория "{category.name}"</Title>
                    </Stack>
                    <Stack gap="xl" mx={140} classNames={{root: styles.attributesDiv}}>
                        <Group justify="space-between">
                            <Title order={2}>Атрибуты категории</Title>
                            <Button onClick={() => setModalOpened(true)} classNames={{
                                root: styles.submitBtn
                            }} leftSection={<IconPlus></IconPlus>}>Добавить атрибут</Button>
                        </Group>
                        {(attribsError || !attribs) ? (
                            <Text c="red" fw={700} ta="center" size="xl">Ошибка загрузки атрибутов ({attribsError && getErrorMessage(attribsError)})</Text>
                        ) : attribs.length === 0 ? (
                            <Text size="xl" c="blue" fw={500} ta="center">Пока нет атрибутов</Text>
                        ) : (
                            <Table withTableBorder withRowBorders withColumnBorders styles={{
                                table: {fontSize: "20px"}
                            }} striped highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th ta="center">Название</Table.Th>
                                        <Table.Th ta="center">Тип</Table.Th>
                                        <Table.Th ta="center">Единица измерения</Table.Th>
                                        <Table.Th ta="center">Действия</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {attribs.map(a => (
                                        <Table.Tr key={a.id} ta="center">
                                            <Table.Td>{a.name}</Table.Td>
                                            <Table.Td>{getAttribTypeLabel(a.type)}</Table.Td>
                                            <Table.Td>{a.unit || "нет"}</Table.Td>
                                            <Table.Td>
                                                <Group gap={4} grow justify="center">
                                                    <ActionIcon color="green" size="xl" onClick={
                                                        () => {
                                                            setEditAttr(a);
                                                            setUpdModalOpened(true);
                                                        }
                                                    }>
                                                        <IconPencil></IconPencil>
                                                    </ActionIcon>
                                                    <ActionIcon color="red" size="xl" onClick={
                                                        () => onDeleteAttr(a.id)
                                                    }>
                                                        <IconTrash></IconTrash>
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}
                    </Stack>
                    <Stack gap="xl" mx={140} classNames={{root: styles.attributesDiv}}>
                        <Group justify="space-between">
                            <Title order={2}>Товары этой категории</Title>
                            <Button onClick={() => nav.push(`/admin/products/create?categoryId=${id}`)} classNames={{
                                root: styles.submitBtn
                            }} leftSection={<IconPlus></IconPlus>}>Добавить товар</Button>
                        </Group>
                        {(productsError || !products) ? (
                            <Text c="red" fw={700} ta="center" size="xl">
                                Ошибка загрузки товаров ({productsError && getErrorMessage(productsError)})
                            </Text>
                        ) : products.items.length === 0 ? (
                            <Text size="xl" c="blue" fw={500} ta="center">Пока нет товаров в этой категории</Text>
                        ) : (
                            <Table withTableBorder withRowBorders withColumnBorders styles={{
                                table: {fontSize: "20px"}
                            }} striped highlightOnHover>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th ta="center">Название</Table.Th>
                                        <Table.Th ta="center">Артикул</Table.Th>
                                        <Table.Th ta="center">Бренд</Table.Th>
                                        <Table.Th ta="center">Цена</Table.Th>
                                        <Table.Th ta="center">Кол-во</Table.Th>
                                        <Table.Th ta="center">В наличии</Table.Th>
                                        <Table.Th ta="center">Действия</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {products.items.map(p => (
                                        <Table.Tr key={p.id} ta="center">
                                            <Table.Td>{p.name}</Table.Td>
                                            <Table.Td>{p.article}</Table.Td>
                                            <Table.Td>{p.brand.name}</Table.Td>
                                            <Table.Td>{p.price} руб.</Table.Td>
                                            <Table.Td>{p.quantity} шт.</Table.Td>
                                            <Table.Td>{p.inStock ? "Да" : "Нет"}</Table.Td>
                                            <Table.Td>
                                                <Group gap={4} justify="center">
                                                    <ActionIcon color="green" size="xl" onClick={
                                                        () => nav.push(`/admin/products/${p.id}`)
                                                    }>
                                                        <IconPencil></IconPencil>
                                                    </ActionIcon>
                                                    <ActionIcon color="red" size="xl" onClick={
                                                        () => onDeleteProduct(p.id)
                                                    }>
                                                        <IconTrash></IconTrash>
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}
                    </Stack>
                </Stack>
            )}
            <AddAttributeModal categoryId={id} opened={modalOpened} onClose={() => setModalOpened(false)}></AddAttributeModal>
            <EditAttributeModal categoryId={id} opened={updModalOpened} onClose={() => {
                setUpdModalOpened(false);
                setEditAttr(null);
            }} attribute={editAttr!} onAttrChange={setEditAttr}></EditAttributeModal>
        </Container>
    )
}