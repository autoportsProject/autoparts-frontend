import { AttributesRepo } from "@/data/repos/AttributesRepo";
import { AttributeDto, AttributeType } from "@/domain";
import { UpdateAttribFormValues, updateAttribSchema } from "@/domain/schemas/admin/attribs/attrib";
import { useUpdateAttrib } from "@/features/attribs/useUpdateAttrib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Stack, TextInput, Select, Button } from "@mantine/core";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "@/shared/styles/admin/category/category.module.scss";

interface Props {
    attribute: AttributeDto;
    onAttrChange: (x: AttributeDto | null) => void;
    opened: boolean;
    onClose: () => void;
}

const aRepo = new AttributesRepo();

export const EditAttributeModal = ({attribute, onAttrChange, opened, onClose}: Props) => {
    const update = useUpdateAttrib(aRepo);
    const updateForm = useForm<UpdateAttribFormValues>({
        defaultValues: {
            name: "",
            type: AttributeType.String,
            unit: undefined
        },
        resolver: zodResolver(updateAttribSchema)
    });
    const onUpdate = (data: UpdateAttribFormValues) => {
        update.mutate({
            id: attribute.id,
            req: data
        });
        onClose();
        updateForm.reset();
    }
    useEffect(() => {
        if (attribute) {
            updateForm.reset({
                name: attribute.name,
                type: attribute.type,
                unit: attribute.unit
            });
        }
    }, [attribute, updateForm]);
    return (
        <Modal title="Изменить атрибут" opened={opened} onClose={() => {
            onClose();
            onAttrChange(null);
        }}>
            <form onSubmit={updateForm.handleSubmit(onUpdate)}>
                <Stack gap="md">
                    <TextInput label="Название" {...updateForm.register("name")} classNames={{
                        input: styles.input
                    }} error={updateForm.formState.errors.name?.message}></TextInput>
                    <Controller control={updateForm.control} name="type" render={({field}) => (
                        <Select label="Тип значения" data={[
                            {value: String(AttributeType.String), label: "Текст"},
                            {value: String(AttributeType.Int), label: "Целое число"},
                            {value: String(AttributeType.Float), label: "Дробное число"},
                            {value: String(AttributeType.Bool), label: "\"Да/Нет\""}
                        ]} value={String(field.value)} onChange={
                            (x) => field.onChange(x ? Number(x) : null)
                        } classNames={{
                            input: styles.input
                        }} error={updateForm.formState.errors.type?.message}></Select>
                    )}></Controller>
                    <TextInput label="Единица измерения (опционально)" classNames={{
                        input: styles.input
                    }} {...updateForm.register("unit")} error={
                        updateForm.formState.errors.unit?.message
                    }></TextInput>
                    <Button type="submit" loading={update.isPending} classNames={{root: styles.submitBtn}}>Изменить атрибут</Button>
                </Stack>
            </form>
        </Modal>
    )
}