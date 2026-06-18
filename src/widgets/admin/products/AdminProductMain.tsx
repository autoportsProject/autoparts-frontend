"use client";

import { Button, Center, Container, Group, Loader, NumberInput, Select, Stack, Switch, Text, Textarea, TextInput, Title } from "@mantine/core";
import { AdminLinkText } from "../AdminLinkText";
import styles from "@/shared/styles/admin/products/product.module.scss";
import { useProductDetails } from "@/features/products/useProductDetails";
import { ProductsRepo } from "@/data/repos/ProductsRepo";
import { getErrorMessage } from "@/shared/utils/getError";
import { AttributeType } from "@/domain";
import { brands } from "@/shared/mocks/brands";
import { Controller, useForm } from "react-hook-form";
import { AttributesRepo } from "@/data/repos/AttributesRepo";
import { BrandsRepo } from "@/data/repos/BrandsRepo";
import { useAttribsListByCategory } from "@/features/attribs/useAttribsList";
import { useBrandsList } from "@/features/brands/useBrandsList";
import { UpdateProductFormValues, updateProductSchema } from "@/domain/schemas/admin/products/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProduct } from "@/features/products/useUpdateProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUpdateProductStock } from "@/features/products/useUpdateProductStock";
import { useUpdateProductPrice } from "@/features/products/useUpdateProductPrice";

interface Props {
    id: string;
}

const repo = new ProductsRepo();
const aRepo = new AttributesRepo();
const bRepo = new BrandsRepo();

export const AdminProductMain = ({id}: Props) => {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");
    const nav = useRouter();
    
    const {product, isLoading, serverError} = useProductDetails(id, repo);
    const {attribs} = useAttribsListByCategory(categoryId ?? "", aRepo);
    const {brands, isLoading: areBrandsLoading, serverError: brandError} = useBrandsList(bRepo);

    const update = useUpdateProduct(repo);
    const form = useForm<UpdateProductFormValues>({
        defaultValues: {
            name: "",
            article: "",
            quantity: 0,
            price: 0,
            inStock: false,
            description: undefined,
            imagePath: undefined,
            brandId: "",
            categoryId: categoryId ?? "",
            attributeValues: undefined
        },
        resolver: zodResolver(updateProductSchema)
    });
    const onSubmit = (data: UpdateProductFormValues) => {
        update.mutate({
            id: id,
            req: data
        });
        nav.push(`/admin/categories/${categoryId}`);
        form.reset();
    }

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name,
                article: product.article,
                quantity: product.quantity,
                price: product.price,
                inStock: product.inStock,
                description: product.description,
                imagePath: product.imagePath,
                brandId: product.brand.id,
                categoryId: product.category.id,
                attributeValues: product.attributeValues
            });
        }
    }, [form, product]);
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : (serverError || !product) ? (
                <Text c="red" fw={700} ta="center">Ошибка загрузки товара. Видимо, такого товара не существует ({serverError && getErrorMessage(serverError)})</Text>
            ) : (
                <Stack gap={45}>
                    <Stack gap="sm" px={40}>
                        <AdminLinkText currentEntityName={product.name}></AdminLinkText>
                        <Title order={1} ta="center">Информация о товаре</Title>
                    </Stack>
                    <Stack gap="md" mx={250} classNames={{root: styles.form}}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <TextInput label="Название" classNames={{
                                input: styles.input
                            }} {...form.register("name")} error={
                                form.formState.errors.name?.message
                            }></TextInput>
                            <TextInput label="Артикул" classNames={{
                                input: styles.input
                            }} {...form.register("article")} error={
                                form.formState.errors.article?.message
                            }></TextInput>
                            <Group align="center">
                                <Controller control={form.control} name="quantity" render={({field}) => (
                                    <NumberInput flex={1} label="Количество" classNames={{
                                        input: styles.input
                                    }} value={field.value} onChange={field.onChange} error={
                                        form.formState.errors.quantity?.message
                                    }></NumberInput>
                                )}></Controller>
                                <Controller control={form.control} name="inStock" render={({field}) => (
                                    <Switch mt={22} label="В наличии" checked={field.value} onChange={
                                        (e) => field.onChange(e.currentTarget.checked)
                                    } size="lg" error={form.formState.errors.inStock?.message}></Switch>
                                )}></Controller>
                                <Controller control={form.control} name="price" render={({field}) => (
                                    <NumberInput flex={1} label="Цена (руб.)" classNames={{
                                        input: styles.input
                                    }} value={field.value} onChange={field.onChange} error={
                                        form.formState.errors.price?.message
                                    }></NumberInput>
                                )}></Controller>
                            </Group>
                            <Textarea label="Описание" classNames={{
                                input: `${styles.input} ${styles.textarea}`
                            }} {...form.register("description")} error={
                                form.formState.errors.description?.message
                            }></Textarea>
                            <TextInput label="Ссылка на картинку" classNames={{
                                input: styles.input
                            }} {...form.register("imagePath")} error={
                                form.formState.errors.imagePath?.message
                            }></TextInput>
                            <Controller control={form.control} name="brandId" render={({field}) => (
                                <Select label="Выберите бренд" classNames={{
                                    input: styles.input
                                }} loading={areBrandsLoading} error={
                                    brandError?.message ?? form.formState.errors.brandId?.message
                                } searchable data={brands?.map(b => ({
                                    value: b.id,
                                    label: b.name
                                }))} value={field.value} onChange={field.onChange}></Select>
                            )}></Controller>
                            {attribs?.map((a,i) => (
                                <Controller key={a.id} control={form.control} name={`attributeValues.${i}.value`} render={({field}) => {
                                    form.setValue(`attributeValues.${i}.attributeId`, a.id);
                                    if (a.type === AttributeType.Boolean) {
                                        return (
                                            <Switch label={a.name} mt="sm" checked={field.value === "true"} onChange={
                                                (e) => field.onChange(e.currentTarget.checked)
                                            } size="lg" error={form.formState.errors.attributeValues?.[i]?.value?.message}></Switch>
                                        )
                                    }
                                    if (a.type === AttributeType.Number) {
                                        return (
                                            <NumberInput label={`${a.name} ${a.unit ? `(${a.unit})` : ""}`} value={
                                                field.value ? Number(field.value) : ""
                                            } classNames={{input: styles.input}} onChange={
                                                (x) => field.onChange(String(x))
                                            } error={form.formState.errors.attributeValues?.[i]?.value?.message}></NumberInput>
                                        )
                                    }
                                    return (
                                        <TextInput label={a.name} classNames={{
                                            input: styles.input
                                        }} {...field} error={form.formState.errors.attributeValues?.[i]?.value?.message}></TextInput>
                                    )
                                }}></Controller>
                            ))}
                            <Group grow mt="md" gap="xl">
                                <Button type="submit" classNames={{
                                    root: styles.submitBtn
                                }} fullWidth>Редактировать товар</Button>
                                <Button type="reset" classNames={{
                                    root: styles.cancelBtn
                                }} fullWidth>Очистить</Button>
                            </Group>
                        </form>
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}