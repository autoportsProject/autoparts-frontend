import { UsersRepo } from "@/data/repos/UsersRepo";
import { ChangePasswordFormValues, changePasswordSchema } from "@/domain/schemas/profile/updatePassword";
import { useChangePassword } from "@/features/users/useChangePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "react-hook-form";
import styles from "@/shared/styles/profile/profile.module.scss";

interface Props {
    opened: boolean;
    onClose: () => void;
}

const repo = new UsersRepo();

export const ChangePasswordModal = ({opened, onClose}: Props) => {
    const change = useChangePassword(repo);
    const form = useForm<ChangePasswordFormValues>({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        resolver: zodResolver(changePasswordSchema)
    });
    const onSubmit = (data: ChangePasswordFormValues) => {
        change.mutate({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }, {
            onSuccess: () => {
                form.reset();
                onClose();
            }
        });
    }
    return (
        <Modal title="Смена пароля" opened={opened} onClose={onClose}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack gap="md">
                    <PasswordInput label="Текущий пароль" classNames={{
                        input: styles.input
                    }} {...form.register("currentPassword")} error={
                        form.formState.errors.currentPassword?.message
                    }></PasswordInput>
                    <PasswordInput label="Новый пароль" classNames={{
                        input: styles.input
                    }} {...form.register("newPassword")} error={
                        form.formState.errors.newPassword?.message
                    }></PasswordInput>
                    <PasswordInput label="Повторите новый пароль" classNames={{
                        input: styles.input
                    }} {...form.register("confirmPassword")} error={
                        form.formState.errors.confirmPassword?.message
                    }></PasswordInput>
                    <Button type="submit" classNames={{
                        root: styles.submitBtn
                    }} loading={change.isPending}>Изменить пароль</Button>
                </Stack>
            </form>
        </Modal>
    )
}