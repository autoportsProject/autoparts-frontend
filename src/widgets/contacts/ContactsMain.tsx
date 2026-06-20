import { Button, Container, Group, InputBase, Loader, Select, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/contacts.module.scss";
import { AppLinkText } from "../AppLinkText";
import { ContactsRepo } from "@/data/repos/ContactsRepo";
import { useContactsList } from "@/features/company/contacts/useContactsList";
import { AppealsRepo } from "@/data/repos/AppealsRepo";
import { Controller, useForm } from "react-hook-form";
import { AddClientQuestionFormValues, addClientQuestionSchema } from "@/domain/schemas/contacts/form";
import { AppealType } from "@/domain";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateClientQuestion } from "@/features/appeals/useCreateAppealQuestion";
import { IMaskInput } from "react-imask";
import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";

const repo = new ContactsRepo();
const aRepo = new AppealsRepo();

export const ContactsMain = () => {
    const {contacts, isLoading, serverError} = useContactsList(repo);
    const mapSrc = `https://maps.google.com/maps?q=56.526733,84.983375&z=12&output=embed`;
    
    const create = useCreateClientQuestion(aRepo);
    const form = useForm<AddClientQuestionFormValues>({
        defaultValues: {
            category: AppealType.OtherQuestion,
            managerComment: "",
            contactPhone: "",
            contactEmail: ""
        },
        resolver: zodResolver(addClientQuestionSchema)
    });
    const onSubmit = (data: AddClientQuestionFormValues) => {
        create.mutate({
            category: data.category,
            managerComment: data.managerComment || "",
            contactPhone: data.contactPhone,
            contactEmail: data.contactEmail
        }, {
            onSuccess: () => {
                form.reset();
            }
        });
    }
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={60}>
                <Stack gap="sm" px={40}>
                    <AppLinkText></AppLinkText>
                    <Title order={1} ta="center">Наши контакты</Title>
                </Stack>
                <Group classNames={{root: styles.contactsSection}}>
                    {isLoading ? (
                        <Group gap="md" justify="center">
                            <Loader size="xl"></Loader>
                            <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                        </Group>
                    ) : (serverError || !contacts) ? (
                        <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке контактов компании</Text>
                    ) : contacts.map((c,i) => (
                        <Stack key={i} classNames={{root: styles.contactDiv}}>
                            <Title order={2} classNames={{root: styles.name}}>{c.description}</Title>
                            <Text c="dimmed" classNames={{root: styles.value}}>{c.name}</Text>
                        </Stack>
                    ))}
                </Group>
                <Group classNames={{root: styles.mapSection}}>
                    <Stack classNames={{root: styles.selectRegion}}>
                        <Title order={3} ta="center">
                            Мы находимся здесь <IconArrowRight className={styles.rightIcon}></IconArrowRight><IconArrowDown className={styles.downIcon}></IconArrowDown>
                        </Title>
                        <Text ta="center">
                            Пункт выдачи в <strong>г.Томск, ул. Смирнова 44/2</strong>
                        </Text>
                        <Text c="dimmed" ta="center">
                            Также у нас есть несколько складов в городе для оперативной доставки заказов.
                        </Text>
                    </Stack>
                    <iframe src={mapSrc} className={styles.map} allowFullScreen></iframe>
                </Group>
                <Stack gap="xl">
                    <Title order={2} ta="center">Остались вопросы? Напишите нам!</Title>
                    <Group classNames={{root: styles.formSection}}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Stack gap="md" classNames={{root: styles.form}}>
                                <Controller control={form.control} name="category" render={({field}) => (
                                    <Select label="Тип вопроса" withAsterisk classNames={{
                                        input: styles.input
                                    }} value={String(field.value)} data={[
                                        { value: String(AppealType.Order), label: "Заказать" },
                                        { value: String(AppealType.Reserve), label: "Забронировать" },
                                        { value: String(AppealType.OtherQuestion), label: "Другой вопрос" }
                                    ]} onChange={
                                        (x) => field.onChange(x ? Number(x) : AppealType.OtherQuestion)
                                    } error={form.formState.errors.category?.message}></Select>
                                )}></Controller>
                                <Textarea label="Ваш вопрос" withAsterisk classNames={{
                                    input: `${styles.input} ${styles.textarea}`
                                }} {...form.register("managerComment")} error={form.formState.errors.managerComment?.message}></Textarea>
                                <Group grow>
                                    <TextInput type="email" label="Контактный Email" withAsterisk classNames={{
                                        input: styles.input
                                    }} {...form.register("contactEmail")} error={form.formState.errors.contactEmail?.message}></TextInput>
                                    <Controller control={form.control} name="contactPhone" render={({field}) => (
                                        <InputBase component={IMaskInput} mask="+7 (000) 000-00-00" classNames={{
                                            input: styles.input
                                        }} {...field} withAsterisk label="Контактный телефон" error={
                                            form.formState.errors.contactPhone?.message
                                        } placeholder="+7 (___) ___-__-__"></InputBase>
                                    )}></Controller>
                                </Group>
                                <Group grow>
                                    <Button type="submit" mt={8} classNames={{root: styles.submitBtn}}>Отправить</Button>
                                    <Button variant="outline" type="reset" mt={8} classNames={{root: styles.cancelBtn}}>Сбросить</Button>
                                </Group>
                            </Stack>
                        </form>
                    </Group>
                </Stack>
            </Stack>
        </Container>
    )
}