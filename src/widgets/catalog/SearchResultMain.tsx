import { Container, Group, Loader, Pagination, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { AppLinkText } from "../AppLinkText"
import { ProductsRepo } from "@/data/repos/ProductsRepo";
import { useState } from "react";
import { ProductQuery } from "@/domain";
import { useProductsList } from "@/features/products/useProductsList";
import styles from "@/shared/styles/catalog/catalog.module.scss";
import { ProductCard } from "./ProductCard";

interface Props {
    query: string;
}

const repo = new ProductsRepo();

export const SearchResultMain = ({query}: Props) => {
    const [page, setPage] = useState(1);
    const size = 12;

    const q: ProductQuery = {
        name: query,
        page,
        pageSize: size,
        sortBy: "name",
        sortOrder: "asc"
    };

    const {products, isLoading, serverError} = useProductsList(q, repo);
    const total = Math.ceil((products?.totalCount ?? 0) / size);
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={45}>
                <Stack gap="sm" px={{base: 16, sm: 40}}>
                    <AppLinkText></AppLinkText>
                    <Title order={1} ta="center">Результаты поиска по запросу "{query}"</Title>
                </Stack>
                {isLoading ? (
                    <Group gap="md" justify="center">
                        <Loader size="xl"></Loader>
                        <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                    </Group>
                ) : (serverError || !products) ? (
                    <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке товаров</Text>
                ) : products.items.length === 0 ? (
                    <Text size="xl" c="blue" fw={500} ta="center">По вашему запросу ничего не найдено</Text>
                ) : (
                    <Stack gap="xl" mx={{base: 16, sm: 60, lg: 140}}>
                        <SimpleGrid cols={{base: 1, xs: 2, sm: 2, md: 3}} spacing="md">
                            {products.items.map(p => (
                                <ProductCard key={p.id} product={p}></ProductCard>
                            ))}
                        </SimpleGrid>
                        <Group justify="center">
                            <Pagination total={total} value={page} onChange={setPage}></Pagination>
                        </Group>
                    </Stack>
                )}
            </Stack>
        </Container>
    )
}