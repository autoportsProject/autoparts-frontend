import { Button, Container, Group, InputBase, Loader, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/supplier.module.scss";
import { IMaskInput } from "react-imask";
import { AppLinkText } from "../AppLinkText";
import { ForSuppliersPageRepo } from "@/data/repos/ForSuppliersPageRepo";
import { useForSuppliersPage } from "@/features/forSuppliers/useForSuppliersPage";
import { useCreateSupplierRequest } from "@/features/appeals/useCreateAppealSupplier";
import { AppealsRepo } from "@/data/repos/AppealsRepo";
import { Controller, useForm } from "react-hook-form";
import { ForSuppliersFormValues, forSuppliersSchema } from "@/domain/schemas/forSuppliers/form";
import { zodResolver } from "@hookform/resolvers/zod";

const repo = new ForSuppliersPageRepo();
const aRepo = new AppealsRepo();

export const ForSuppliersMain = () => {
    const {page, isLoading, serverError} = useForSuppliersPage(repo);
    const create = useCreateSupplierRequest(aRepo);

    const form = useForm<ForSuppliersFormValues>({
        defaultValues: {
            companyName: "",
            contactName: "",
            phone: "",
            email: "",
            comment: ""
        },
        resolver: zodResolver(forSuppliersSchema)
    });
    const onSubmit = (data: ForSuppliersFormValues) => {
        create.mutate({
            companyName: data.companyName,
            managerComment: `Контактное лицо: ${data.contactName}${data.comment?.trim() ? `. Комментарий: ${data.comment}` : ""}`,
            contactPhone: data.phone,
            contactEmail: data.email
        }, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    return (
        <Container size="100%" px={0} py="xl">
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="xl"></Loader>
                    <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (serverError || !page) ? (
                <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке раздела Поставщикам</Text>
            ) : (
                <Stack gap={60}>
                    <Stack gap="sm" px={40}>
                        <AppLinkText></AppLinkText>
                        <Stack gap="lg">
                            <Title order={1} ta="center">{page.title}</Title>
                            <Text classNames={{root: styles.description}}>{page.content}</Text>
                        </Stack>
                    </Stack>
                    <Stack gap="lg" align="center" classNames={{root: styles.conditionsDiv}}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap={8} classNames={{root: styles.form}}>
                                <Title order={3} mb={8} ta="center">Заполните форму ниже</Title>
                                <TextInput withAsterisk {...form.register("contactName")} error={
                                    form.formState.errors.contactName?.message
                                } label="ФИО контактного лица" classNames={{input: styles.input}}></TextInput>
                                <TextInput withAsterisk {...form.register("companyName")} error={
                                    form.formState.errors.companyName?.message
                                } label="Название компании" classNames={{input: styles.input}}></TextInput>
                                <Group grow>
                                    <TextInput type="email" {...form.register("email")} error={
                                        form.formState.errors.email?.message
                                    } withAsterisk label="Email" classNames={{input: styles.input}}></TextInput>
                                    <Controller control={form.control} name="phone" render={({field}) => (
                                        <InputBase component={IMaskInput} {...field} withAsterisk error={
                                            form.formState.errors.phone?.message
                                        } label="Контактный телефон" mask="+7 (000) 000-00-00" classNames={{
                                            input: styles.input
                                        }} placeholder="+7 (___) ___-__-__"></InputBase>
                                    )}></Controller>
                                </Group>
                                <Textarea label="Комментарий" classNames={{
                                    input: `${styles.input} ${styles.textarea}`
                                }} {...form.register("comment")}></Textarea>
                                <Group grow>
                                    <Button type="submit" mt={8} classNames={{root: styles.submitBtn}}>Отправить</Button>
                                    <Button variant="outline" type="reset" mt={8} classNames={{root: styles.cancelBtn}}>Сбросить</Button>
                                </Group>
                            </Stack>
                        </form>
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}