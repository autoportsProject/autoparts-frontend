import { Container, Stack, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductsRepo } from "@/data/repos/ProductsRepo"
import { useCreateProduct } from "@/features/products/useCreateProduct";
import styles from "@/shared/styles/admin/products/product-create.module.scss";

const repo = new ProductsRepo();

export const AdminProductCreateMain = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("categoryId");

    const create = useCreateProduct(repo);
    const nav = useRouter();
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={45}>
                <Stack gap="sm" px={40}>
                    <AdminLinkText></AdminLinkText>
                    <Title order={1} ta="center">Создание товара</Title>
                </Stack>
                <Stack gap="md" mx={250} classNames={{root: styles.form}}>

                </Stack>
            </Stack>
        </Container>
    )
}