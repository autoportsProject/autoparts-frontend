import { Anchor, Box, Button, Container, InputBase, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import Link from "next/link"
import styles from "@/shared/styles/register.module.scss";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "@/domain/schemas/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";

export const RegisterPage = () => {
    const nav = useRouter();
    const form = useForm<RegisterFormValues>({
        defaultValues: {
            name: null,
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(registerSchema)
    });
    const onSubmit = () => {
        nav.push("/");
    }
    return (
        <Box className={styles.container}>
            <Container py="xl">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack classNames={{root: styles.loginCard}}>
                        <Title order={1} ta="center">Регистрация</Title>
                        <TextInput label="Имя" withAsterisk {...form.register("name")} c="dimmed" error={form.formState.errors.name?.message}></TextInput>
                        <TextInput type="email" label="Email" withAsterisk {...form.register("email")} c="dimmed" error={form.formState.errors.email?.message}></TextInput>
                        <Controller control={form.control} name="phone" render={({field}) => (
                            <InputBase label="Телефон" component={IMaskInput} mask="+7 (000) 000-00-00" {...field} c="dimmed" error={form.formState.errors.phone?.message}></InputBase>
                        )}></Controller>
                        <PasswordInput withAsterisk label="Пароль" {...form.register("password")} c="dimmed" error={form.formState.errors.password?.message}></PasswordInput>
                        <PasswordInput withAsterisk label="Повторите пароль" {...form.register("confirmPassword")} c="dimmed" error={form.formState.errors.confirmPassword?.message}></PasswordInput>
                        <Button type="submit" mt="sm" classNames={{root: styles.loginBtn}}>Зарегистрироваться</Button>
                        <Text ta="center">Уже есть аккаунт? <Anchor component={Link} href="/login">Войти</Anchor></Text>
                    </Stack>
                </form>
            </Container>
        </Box>
    )
}