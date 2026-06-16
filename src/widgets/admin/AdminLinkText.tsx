"use client";

import { useCategories } from "@/features/catalogs/useCategories";
import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/shared/styles/linktext/link.module.scss";

const routeNames: Record<string, string> = {
    "": "Главная",
    "brands": "Бренды",
    "products": "Товары",
    "news": "Новости",
    "discount": "Акции",
    "users": "Пользователи",
    "appeals": "Обращения"
};

export const AdminLinkText = () => {
    const pathname = usePathname();
    const segs = pathname.split("/").filter(Boolean);
    const {catalogs} = useCategories();
    
    const parts = [
        {label: "Главная", href: "/"},
        ...segs.map((s,i) => ({
            label: /^[0-9a-f-]{36}$/i.test(s) 
                ? (catalogs.find(c => c.id === s)?.name ?? s)
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