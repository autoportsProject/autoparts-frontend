import { Anchor, Box, Button, Container, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/login.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginFormValues, loginSchema } from "@/domain/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginPage = () => {
    const nav = useRouter();
    const form = useForm<LoginFormValues>({
        defaultValues: {
            login: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = () => {
        nav.push("/");
    }
    return (
        <Box className={styles.container}>
            <Container py="xl">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack classNames={{root: styles.loginCard}}>
                        <Title order={1} ta="center">Войти в систему</Title>
                        <TextInput label="Логин или телефон" {...form.register("login")} c="dimmed" error={form.formState.errors.login?.message}></TextInput>
                        <PasswordInput label="Пароль" {...form.register("password")} c="dimmed" error={form.formState.errors.password?.message}></PasswordInput>
                        <Anchor component={Link} href="#">Забыли пароль?</Anchor>
                        <Button type="submit" mt="sm" classNames={{root: styles.loginBtn}}>Войти в систему</Button>
                        <Text ta="center">Нет аккаунта? <Anchor component={Link} href="/register">Зарегистрироваться</Anchor></Text>
                    </Stack>
                </form>
            </Container>
        </Box>
    )
}