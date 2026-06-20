import { Button, Container, Group, NumberInput, Select, Stack, Switch, Textarea, TextInput, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import { useRouter, useSearchParams } from "next/navigation"
import { ProductsRepo } from "@/data/repos/ProductsRepo"
import { useCreateProduct } from "@/features/products/useCreateProduct";
import styles from "@/shared/styles/admin/products/product-create.module.scss";
import { Controller, useForm } from "react-hook-form";
import { AddProductFormValues, addProductSchema } from "@/domain/schemas/admin/products/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandsRepo } from "@/data/repos/BrandsRepo";
import { useBrandsList } from "@/features/brands/useBrandsList";
import { useAttribsListByCategory } from "@/features/attribs/useAttribsList";
import { AttributesRepo } from "@/data/repos/AttributesRepo";
import { AttributeType } from "@/domain";

const repo = new ProductsRepo();
const aRepo = new AttributesRepo();
const bRepo = new BrandsRepo();

export const AdminProductCreateMain = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("categoryId");

    const {attribs} = useAttribsListByCategory(id ?? "", aRepo);
    const {brands, isLoading, serverError} = useBrandsList(bRepo);

    const create = useCreateProduct(repo);
    const nav = useRouter();
    const form = useForm<AddProductFormValues>({
        defaultValues: {
            name: "",
            article: "",
            quantity: 0,
            price: 0,
            inStock: false,
            description: undefined,
            imagePath: undefined,
            brandId: "",
            categoryId: id ?? "",
            attributeValues: undefined
        },
        resolver: zodResolver(addProductSchema)
    });
    const onSubmit = (data: AddProductFormValues) => {
        create.mutate(data, {
            onSuccess: () => {
                if (id)
                    nav.push(`/admin/categories/${id}`);
                else
                    nav.push(`/admin/categories`);
                
                form.reset();
            }
        });
    }
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={45}>
                <Stack gap="sm" px={40}>
                    <AdminLinkText></AdminLinkText>
                    <Title order={1} ta="center">Создание товара</Title>
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
                            }} loading={isLoading} error={
                                serverError?.message ?? form.formState.errors.brandId?.message
                            } searchable data={brands?.map(b => ({
                                value: b.id,
                                label: b.name
                            }))} value={field.value} onChange={field.onChange}></Select>
                        )}></Controller>
                        {attribs?.map((a,i) => (
                            <Controller key={a.id} control={form.control} name={`attributeValues.${i}.value`} render={({field}) => {
                                form.setValue(`attributeValues.${i}.attributeId`, a.id);
                                if (a.type === AttributeType.Bool) {
                                    return (
                                        <Switch label={a.name} mt="sm" checked={field.value === "true"} onChange={
                                            (e) => field.onChange(e.currentTarget.checked)
                                        } size="lg" error={form.formState.errors.attributeValues?.[i]?.value?.message}></Switch>
                                    )
                                }
                                if (a.type === AttributeType.Int || a.type === AttributeType.Float) {
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
                            }} fullWidth>Добавить товар</Button>
                            <Button type="reset" classNames={{
                                root: styles.cancelBtn
                            }} fullWidth>Очистить</Button>
                        </Group>
                    </form>
                </Stack>
            </Stack>
        </Container>
    )
}