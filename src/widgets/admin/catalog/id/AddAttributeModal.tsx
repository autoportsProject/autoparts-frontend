import { AttributesRepo } from "@/data/repos/AttributesRepo";
import { AttributeType } from "@/domain";
import { AddAttribFormValues, addAttribSchema } from "@/domain/schemas/admin/attribs/attrib";
import { useCreateAttrib } from "@/features/attribs/useCreateAttrib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Stack, TextInput, Select, Button } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import styles from "@/shared/styles/admin/category/category.module.scss";

interface Props {
    categoryId: string;
    opened: boolean;
    onClose: () => void;
}

const aRepo = new AttributesRepo();

export const AddAttributeModal = ({categoryId, opened, onClose}: Props) => {
    const create = useCreateAttrib(aRepo);
    const createForm = useForm<AddAttribFormValues>({
        defaultValues: {
            name: "",
            type: AttributeType.String,
            unit: undefined,
            categoryId: categoryId
        },
        resolver: zodResolver(addAttribSchema)
    });
    const onSubmit = (data: AddAttribFormValues) => {
        create.mutate({...data, categoryId: categoryId});
        onClose();
        createForm.reset();
    }
    return (
        <Modal title="Создание атрибута" opened={opened} onClose={onClose}>
            <form onSubmit={createForm.handleSubmit(onSubmit, (errors) => console.log(errors))}>
                <Stack gap="md">
                    <TextInput label="Название" {...createForm.register("name")} classNames={{
                        input: styles.input
                    }} error={createForm.formState.errors.name?.message}></TextInput>
                    <Controller control={createForm.control} name="type" render={({field}) => (
                        <Select label="Тип значения" data={[
                            {value: String(AttributeType.String), label: "Текст"},
                            {value: String(AttributeType.Number), label: "Число"},
                            {value: String(AttributeType.Boolean), label: "\"Да/Нет\""}
                        ]} value={String(field.value)} onChange={
                            (x) => field.onChange(x ? Number(x) : null)
                        } classNames={{
                            input: styles.input
                        }} error={createForm.formState.errors.type?.message}></Select>
                    )}></Controller>
                    <TextInput label="Единица измерения (опционально)" classNames={{
                        input: styles.input
                    }} {...createForm.register("unit")} error={
                        createForm.formState.errors.unit?.message
                    }></TextInput>
                    <Button type="submit" loading={create.isPending} classNames={{root: styles.submitBtn}}>Добавить атрибут</Button>
                </Stack>
            </form>
        </Modal>
    )
}