import { Text } from "@mantine/core";
import styles from "@/shared/styles/catalog/catalogs-list.module.scss";
import { useRouter } from "next/navigation";

interface CardProps {
    id: string;
    name: string;
}

export const CatalogCard = ({id, name}: CardProps) => {
    const nav = useRouter();
    return (
        <Text key={id} classNames={{root: styles.catalogCard}} onClick={
            () => nav.push(`/catalog/${id}`)
        }>{name}</Text>
    )
}