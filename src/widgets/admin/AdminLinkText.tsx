"use client";

import { useCategoriesList } from "@/features/catalogs/useCategoriesList";
import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/shared/styles/linktext/link.module.scss";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { ProductsRepo } from "@/data/repos/ProductsRepo";
import { useProductDetails } from "@/features/products/useProductDetails";
import { useBreadcrumbs } from "@/shared/hooks/useBreadcrumbs";

const routeNames: Record<string, string> = {
    "admin": "Главная",
    "categories": "Категории",
    "brands": "Бренды",
    "products": "Товары",
    "news": "Новости",
    "discount": "Акции",
    "company": "О компании",
    "for_suppliers": "Карточка \"Поставщикам\"",
    "users": "Пользователи",
    "appeals": "Обращения",
    "create": "Создание товара",
    "certificates": "Сертификаты"
};

interface Props {
    currentEntityName?: string;
}

export const AdminLinkText = ({currentEntityName}: Props) => {
    const parts = useBreadcrumbs(routeNames, {
        productsHrefOverride: "/admin/categories",
        currentEntityName: currentEntityName
    });

    return (
        <Breadcrumbs>
            {parts.map((x, i) => {
                const isActive = (i === parts.length - 1);
                return isActive ? (
                    <Text key={x.href} classNames={{root: styles.linkActive}}>{x.label}</Text>
                ) : (
                    <Anchor classNames={{
                        root: styles.link
                    }} key={x.href} component={Link} href={x.href}>
                        {x.label}
                    </Anchor>
                )
            })}
        </Breadcrumbs>
    )
}