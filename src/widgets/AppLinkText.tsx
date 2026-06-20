"use client";

import { Anchor, Breadcrumbs, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/shared/styles/linktext/link.module.scss";
import { useCategoriesList } from "@/features/catalogs/useCategoriesList";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useBreadcrumbs } from "@/shared/hooks/useBreadcrumbs";

const routeNames: Record<string, string> = {
    "": "Главная",
    "news": "Новости",
    "discounts": "Акции",
    "about": "О нас",
    "for_suppliers": "Поставщикам",
    "contacts": "Контакты",
    "catalog": "Каталог товаров",
    "search": "Результаты поиска"
};

export const AppLinkText = () => {
    const parts = useBreadcrumbs(routeNames, {
        homeLabel: "Главная"
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