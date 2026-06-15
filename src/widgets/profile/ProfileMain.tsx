import { UsersRepo } from "@/data/repos/UsersRepo"
import { useProfile } from "@/features/users/useProfile";
import { Button, Center, Container, InputBase, Loader, Stack, Text, TextInput, Title } from "@mantine/core"
import styles from "@/shared/styles/profile/profile.module.scss";
import { useUpdateProfile } from "@/features/users/useUpdateProfile";
import { Controller, useForm } from "react-hook-form";
import { UpdateProfileFormValues, updateProfileSchema } from "@/domain/schemas/profile/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { IMaskInput } from "react-imask";

const repo = new UsersRepo();

export const ProfileMain = () => {
    const {profile, isLoading, serverError} = useProfile(repo);
    const update = useUpdateProfile(repo);
    const form = useForm<UpdateProfileFormValues>({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: ""
        },
        resolver: zodResolver(updateProfileSchema)
    });
    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.name,
                email: profile.email,
                phoneNumber: profile.phoneNumber ?? undefined
            });
            console.log(`phone ${profile.phoneNumber}`);
        }
    }, [profile]);
    const onSubmit = (data: UpdateProfileFormValues) => update.mutate(data);
    return (
        <Container py="xl">
            {isLoading ? (
                <Center py="xl">
                    <Loader size="xl"></Loader>
                </Center>
            ) : !profile ? (
                <Text c="red" fw={700} ta="center">Вы не авторизованы в системе. Зайдите в систему</Text>
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Stack classNames={{root: styles.profileForm}}>
                        <Title order={2} ta="center">Информация о профиле</Title>
                        <TextInput label="Имя" classNames={{
                            input: styles.input
                        }} error={
                            form.formState.errors.name?.message
                        } {...form.register("name")}></TextInput>
                        <TextInput type="email" classNames={{
                            input: styles.input
                        }} label="Email" error={
                            form.formState.errors.email?.message
                        } {...form.register("email")}></TextInput>
                        <Controller control={form.control} name="phoneNumber" render={({field}) => (
                            <InputBase key={profile?.phoneNumber} label="Телефон" classNames={{
                                input: styles.input
                            }} component={IMaskInput} error={
                                form.formState.errors.phoneNumber?.message
                            } mask="+7 (000) 000-00-00" {...field}></InputBase>
                        )}></Controller>
                        <Button type="submit" classNames={{root: styles.submitBtn}}>Обновить сведения</Button>
                    </Stack>
                </form>
            )}
        </Container>
    )
}