import { Anchor, Box, Button, Container, InputBase, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import Link from "next/link"
import styles from "@/shared/styles/register.module.scss";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "@/domain/schemas/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { useRegister } from "@/features/auth/useRegister";
import { AuthRepo } from "@/data/repos/AuthRepo";
import { Header } from "@/widgets/Header";

const repo = new AuthRepo();

export const RegisterPage = () => {
    const register = useRegister(repo);
    const form = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(registerSchema)
    });
    const onSubmit = (data: RegisterFormValues) => {
        const {confirmPassword, ...req} = data;
        register.mutate(req);
    }
    return (
        <Box className={styles.container}>
            <Header></Header>
            <Container py="xl">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack classNames={{root: styles.loginCard}}>
                        <Title order={1} ta="center">Регистрация</Title>
                        <TextInput label="Имя" withAsterisk {...form.register("name")} c="dimmed" error={form.formState.errors.name?.message}></TextInput>
                        <TextInput type="email" label="Email" withAsterisk {...form.register("email")} c="dimmed" error={form.formState.errors.email?.message}></TextInput>
                        <Controller control={form.control} name="phoneNumber" render={({field}) => (
                            <InputBase label="Телефон" component={IMaskInput} mask="+7 (000) 000-00-00" {...field} c="dimmed" error={form.formState.errors.phoneNumber?.message}></InputBase>
                        )}></Controller>
                        <PasswordInput withAsterisk label="Пароль" {...form.register("password")} c="dimmed" error={form.formState.errors.password?.message}></PasswordInput>
                        <PasswordInput withAsterisk label="Повторите пароль" {...form.register("confirmPassword")} c="dimmed" error={form.formState.errors.confirmPassword?.message}></PasswordInput>
                        {register.error && (
                            <Text c="red" fw={700} ta="center">{register.error.message}</Text>
                        )}
                        <Button type="submit" mt="sm" classNames={{
                            root: styles.loginBtn
                        }} loading={register.isPending}>Зарегистрироваться</Button>
                        <Text ta="center">Уже есть аккаунт? <Anchor component={Link} href="/login">Войти</Anchor></Text>
                    </Stack>
                </form>
            </Container>
        </Box>
    )
}