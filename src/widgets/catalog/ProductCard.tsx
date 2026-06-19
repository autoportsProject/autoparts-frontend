import { ProductListItemDto } from "@/domain";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import styles from "@/shared/styles/catalog/product.module.scss";
import { IconInfoCircle, IconPlus } from "@tabler/icons-react";
import noImage from "@/assets/no-image.png";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { useState } from "react";

interface CardProps {
    product: ProductListItemDto;
}

export const ProductCard = ({product}: CardProps) => {
    const [modalOpened, setModalOpened] = useState(false);
    return (
        <Stack classNames={{root: styles.card}}>
            <img className={styles.pic} alt={product.name} src={product.imagePath || noImage.src}></img>
            <Title order={3}>{product.name}</Title>
            <Stack gap={8}>
                <Text classNames={{root: styles.descr}}>Артикул: <span>{product.article}</span></Text>
                <Text classNames={{root: styles.descr}}>Бренд: <span>{product.brand.name}</span></Text>
            </Stack>
            <Group justify="space-between">
                <Text bg={product.inStock ? "green" : "red"} classNames={{root: styles.inStock}}>
                    {!product.inStock ? "Не в" : "В"} наличии
                </Text>
                <Text fw={700} size="lg" c="red">{product.price} руб.</Text>
            </Group>
            <Button fullWidth onClick={() => setModalOpened(true)} classNames={{
                root: styles.submitBtn
            }} leftSection={<IconInfoCircle></IconInfoCircle>}>Подробнее о товаре</Button>
            <ProductDetailsModal productId={product.id} opened={modalOpened} onClose={() => setModalOpened(false)}></ProductDetailsModal>
        </Stack>
    )
}