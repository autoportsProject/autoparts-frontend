import { ProductsRepo } from "@/data/repos/ProductsRepo";
import { useProductDetails } from "@/features/products/useProductDetails";
import { Group, Loader, Modal, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import noImage from "@/assets/no-image.png";
import styles from "@/shared/styles/catalog/product.module.scss";

interface Props {
    productId: string;
    opened: boolean;
    onClose: () => void;
}

const repo = new ProductsRepo();

export const ProductDetailsModal = ({productId, opened, onClose}: Props) => {
    const {product, isLoading, serverError} = useProductDetails(productId, repo);
    return (
        <Modal title="Информация о товаре" size={1200} opened={opened} onClose={onClose}>
            {isLoading ? (
                <Group gap="md" justify="center">
                    <Loader size="xl"></Loader>
                    <Text c="blue" size="lg">Пожалуйста, подождите...</Text>
                </Group>
            ) : (serverError || !product) ? (
                <Text c="red" fw={700} ta="center">Произошла ошибка при загрузке карточки товара. Возможно, такого товара не существует</Text>
            ) : (
                <Group grow gap={75} px={24}>
                    <img src={product.imagePath || noImage.src} alt={product.name} width={400} height={400} style={{objectFit: "fill"}}></img>
                    <Stack gap="lg">
                        <Group justify="space-between">
                            <Title order={1}>{product.name}</Title>
                            <Title order={1} c="red">{product.price} руб.</Title>
                        </Group>
                        <Text classNames={{root: styles.cardDescr}}>Описание: <span>{product.description}</span></Text>
                        <Text classNames={{root: styles.cardDescr}}>Артикул: <span>{product.article}</span></Text>
                        <Text classNames={{root: styles.cardDescr}}>Бренд: <span>{product.brand.name}</span></Text>
                        {product.attributeValues && product.attributeValues.length > 0 && (
                            <Stack gap={4}>
                                <Text fw={500}>Характеристики:</Text>
                                {product.attributeValues.map(x => (
                                    <Text key={x.attributeId} classNames={{root: styles.cardDescr}}>
                                        {x.attributeName}: <span>
                                            {x.value === "true" ? "Да" : x.value === "false" ? "Нет" : x.value}
                                            {x.unit ? ` ${x.unit}` : ""}
                                        </span>
                                    </Text>
                                ))}
                            </Stack>
                        )}
                        <Text bg={product.inStock ? "green" : "red"} classNames={{root: styles.inStock}}>
                            {product.inStock ? "Товар сейчас в наличии" : "Товара сейчас нет в наличии"}
                        </Text>
                        {product.inStock && (
                            <Text classNames={{root: styles.cardDescr}}>В наличии: <span>{product.quantity} шт.</span></Text>
                        )}
                    </Stack>
                </Group>
            )}
        </Modal>
    )
}