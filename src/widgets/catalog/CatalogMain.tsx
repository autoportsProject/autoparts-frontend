import { Badge, Button, Card, Center, Container, Group, Loader, NumberInput, Pagination, Select, SimpleGrid, Stack, Switch, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/catalog/catalog.module.scss";
import { AppLinkText } from "../AppLinkText";
import { AttributeFilterQuery, AttributeType, ProductFilterParams, ProductQuery } from "@/domain";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useCategoryDetails } from "@/features/catalogs/useCategoryDetails";
import { useState } from "react";
import { ProductsRepo } from "@/data/repos/ProductsRepo";
import { useProductsList } from "@/features/products/useProductsList";
import { ProductCard } from "./ProductCard";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { BrandsRepo } from "@/data/repos/BrandsRepo";
import { useBrandsList } from "@/features/brands/useBrandsList";

interface CatalogProps {
    categoryId: string;
}

interface AttrFilterValue {
    min?: string;
    max?: string;
    value?: string;
}

const repo = new CategoriesRepo();
const pRepo = new ProductsRepo();
const bRepo = new BrandsRepo();

export const CatalogMain = ({categoryId}: CatalogProps) => {
    const {category, isLoading, serverError} = useCategoryDetails(categoryId, repo);
    const {brands} = useBrandsList(bRepo);
    
    const defaultFilters: ProductFilterParams = ({
        sortBy: "name",
        sortOrder: "asc",
        page: 1,
        pageSize: 12
    });

    const [data, setData] = useState<ProductFilterParams>(defaultFilters);
    const [filters, setFilters] = useState<ProductFilterParams>(defaultFilters);
    const [attrFilters, setAttrFilters] = useState<Record<string, AttrFilterValue>>({});
    const [appliedAttrs, setAppliedAttrs] = useState<AttributeFilterQuery[]>([]);

    const query: ProductQuery = {
        categoryId,
        ...filters,
        attributeFilters: appliedAttrs
    };

    const {products, isLoading: areProductsLoading, serverError: prodError} = useProductsList(query, pRepo);

    const updateFilter = (patch: Partial<ProductFilterParams>) => {
        setData(prev => ({
            ...prev,
            ...patch,
            page: 1
        }));
    }
    const updateAttrFilter = (attributeId: string, patch: Partial<AttrFilterValue>) => {
        setAttrFilters(prev => ({
            ...prev,
            [attributeId]: {...prev[attributeId], ...patch}
        }));
    }
    const onPageChange = (page: number) => {
        setFilters(prev => ({
            ...prev,
            page: page
        }));
    }

    const onReset = () => {
        setData(defaultFilters);
        setFilters(defaultFilters);
        setAttrFilters({});
        setAppliedAttrs([]);
    }
    const onSearch = () => {
        const attributeFilters: AttributeFilterQuery[] = Object.entries(attrFilters)
            .filter(([, v]) => v.min || v.max || v.value)
            .map(([id, x]) => ({
                attributeId: id,
                min: x.min,
                max: x.max,
                value: x.value
            }));
        setAppliedAttrs(attributeFilters);
        setFilters({...data, page: 1});
    };
    const total = Math.ceil((products?.totalCount ?? 0) / filters.pageSize);
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="xl"></Loader>
                    <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (serverError || !category) ? (
                <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке категории</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AppLinkText></AppLinkText>
                        <Title order={1} ta="center">Найти запчасти</Title>
                    </Stack>
                    {category.attributes && category.attributes.length > 0 && (
                        <Stack gap="lg" mx={250} classNames={{root: styles.filterDiv}}>
                            <Title order={2}>Фильтры</Title>
                            <SimpleGrid cols={3} spacing="lg">
                                <TextInput label="Название" classNames={{
                                    input: styles.input
                                }} placeholder="Поиск по названию" value={data.name ?? ""} onChange={
                                    (e) => updateFilter({name: e.currentTarget.value || undefined})
                                }></TextInput>
                                <Select label="Бренд" classNames={{
                                    input: styles.input
                                }} placeholder="Все" clearable data={brands?.map(b => ({
                                    value: b.id,
                                    label: b.name
                                })) ?? []} value={data.brandId ?? null} onChange={
                                    (x) => updateFilter({brandId: x ?? undefined})
                                }></Select>
                                <Select label="В наличии" classNames={{
                                    input: styles.input
                                }} clearable placeholder="Без разницы" data={[
                                    {value: "true", label: "В наличии"},
                                    {value: "false", label: "Не в наличии"}
                                ]} value={data.inStock === undefined ? null : String(data.inStock)} onChange={
                                    (x) => updateFilter({inStock: x === null ? undefined : x === "true"})
                                }></Select>
                                {category.attributes.map(a => {
                                    if (a.type === AttributeType.Bool) {
                                        return (
                                            <Select key={a.id} label={a.name} classNames={{
                                                input: styles.input
                                            }} clearable placeholder="Любое" data={[
                                                {value: "true", label: "Да"},
                                                {value: "false", label: "Нет"}
                                            ]} value={attrFilters[a.id]?.value ?? null} onChange={
                                                (x) => updateAttrFilter(a.id, {value: x ?? undefined})
                                            }></Select>
                                        );
                                    }
                                    if (a.type === AttributeType.Int || a.type === AttributeType.Float) {
                                        return (
                                            <Stack key={a.id} gap={4}>
                                                <Text size="sm" fw={500}>
                                                    {a.name}{a.unit ? ` (${a.unit})` : ""}
                                                </Text>
                                                <Group gap="xs" grow>
                                                    <NumberInput placeholder="От" classNames={{
                                                        input: styles.input
                                                    }} value={attrFilters[a.id]?.min !== undefined ? Number(attrFilters[a.id].min) : ""} onChange={
                                                        (x) => updateAttrFilter(a.id, {min: x !== "" ? String(x) : undefined})
                                                    }></NumberInput>
                                                    <NumberInput placeholder="До" classNames={{
                                                        input: styles.input
                                                    }} value={attrFilters[a.id]?.max !== undefined ? Number(attrFilters[a.id].max) : ""} onChange={
                                                        (x) => updateAttrFilter(a.id, {max: x !== "" ? String(x) : undefined})
                                                    }></NumberInput>
                                                </Group>
                                            </Stack>
                                        )
                                    }
                                    return (
                                        <TextInput key={a.id} label={`${a.name}${a.unit ? `(${a.unit})` : ""}`} classNames={{
                                            input: styles.input
                                        }} placeholder="Поиск..." onChange={
                                            (e) => updateAttrFilter(a.id, {value: e.currentTarget.value || undefined})
                                        } value={attrFilters[a.id]?.value ?? ""}></TextInput>
                                    )
                                })}
                            </SimpleGrid>
                            <Group justify="space-between">
                                <NumberInput label="Товаров на странице" value={data.pageSize} onChange={
                                    (x) => updateFilter({pageSize: !x ? data.pageSize : Number(x)})
                                } classNames={{input: styles.input}}></NumberInput>
                                <Select label="Сортировать по" classNames={{
                                    input: styles.input
                                }} value={`${data.sortBy}_${data.sortOrder}`} data={[
                                    { value: "name_asc", label: "По названию (А-Я)" },
                                    { value: "name_desc", label: "По названию (Я-А)" },
                                    { value: "price_asc", label: "Сначала дешевле" },
                                    { value: "price_desc", label: "Сначала дороже" },
                                ]} onChange={
                                    (x) => {
                                        if (!x) return;

                                        const [sortBy, sortOrder] = x.split("_");
                                        updateFilter({sortBy, sortOrder});
                                    }
                                }></Select>
                            </Group>
                            <Group gap="md" justify="flex-end">
                                <Button onClick={onSearch} classNames={{root: styles.submitBtn}}>Поиск</Button>
                                <Button onClick={onReset} classNames={{root: styles.cancelBtn}}>Отмена</Button>
                            </Group>
                        </Stack>
                    )}
                    {areProductsLoading ? (
                        <Group gap="md" justify="center">
                            <Loader size="xl"></Loader>
                            <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                        </Group>
                    ) : (prodError) ? (
                        <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке товаров</Text>
                    ) : (!products || products.items.length === 0) ? (
                        <Text c="blue" size="lg" fw={500} ta="center">По вашему запросу товары не найдены</Text>
                    ) : (
                        <Stack gap="md" mx={250}>
                            <SimpleGrid cols={3} spacing="lg">
                                {products.items.map(p => (
                                    <ProductCard key={p.id} product={p}></ProductCard>
                                ))}
                            </SimpleGrid>
                            {products.totalCount > filters.pageSize && (
                                <Center>
                                    <Pagination total={total} value={products.page} onChange={onPageChange}></Pagination>
                                </Center>
                            )}
                        </Stack>
                    )}
                </Stack>
            )}
        </Container>
    )
}