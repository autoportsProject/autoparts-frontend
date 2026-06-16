"use client";

import { useCategoriesList } from "@/features/catalogs/useCategoriesList";
import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/shared/styles/linktext/link.module.scss";
import { CategoriesRepo } from "@/data/repos/CategoriesRepo";

const routeNames: Record<string, string> = {
    "admin": "Главная",
    "categories": "Категории",
    "brands": "Бренды",
    "products": "Товары",
    "news": "Новости",
    "discount": "Акции",
    "users": "Пользователи",
    "appeals": "Обращения"
};

const repo = new CategoriesRepo();

export const AdminLinkText = () => {
    const pathname = usePathname();
    const segs = pathname.split("/").filter(Boolean);
    const {categories} = useCategoriesList(repo);
    
    const parts = [
        ...segs.map((s,i) => ({
            label: /^[0-9a-f-]{36}$/i.test(s) 
                ? (categories?.find(c => c.id === s)?.name ?? s)
                : (routeNames[s] ?? s),
            href: "/" + segs.slice(0, i+1).join("/")
        }))
    ];

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