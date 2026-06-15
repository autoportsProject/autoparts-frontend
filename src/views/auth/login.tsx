import { Anchor, Box, Button, Container, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/login.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginFormValues, loginSchema } from "@/domain/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthRepo } from "@/data/repos/AuthRepo";
import { useLogin } from "@/features/auth/useLogin";
import { getErrorMessage } from "@/shared/utils/getError";

const repo = new AuthRepo();

export const LoginPage = () => {
    const login = useLogin(repo);
    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = (data: LoginFormValues) => login.mutate(data);
    return (
        <Box className={styles.container}>
            <Container py="xl">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack classNames={{root: styles.loginCard}}>
                        <Title order={1} ta="center">Войти в систему</Title>
                        <TextInput type="email" label="Email" {...form.register("email")} c="dimmed" error={form.formState.errors.email?.message}></TextInput>
                        <PasswordInput label="Пароль" {...form.register("password")} c="dimmed" error={form.formState.errors.password?.message}></PasswordInput>
                        {login.error && (
                            <Text c="red" fw={700} ta="center">{getErrorMessage(login.error)}</Text>
                        )}
                        <Anchor component={Link} href="#">Забыли пароль?</Anchor>
                        <Button type="submit" mt="sm" classNames={{
                            root: styles.loginBtn
                        }} loading={login.isPending}>Войти в систему</Button>
                        <Text ta="center">Нет аккаунта? <Anchor component={Link} href="/register">Зарегистрироваться</Anchor></Text>
                    </Stack>
                </form>
            </Container>
        </Box>
    )
}