"use client";

import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { CatalogMain } from "@/widgets/catalog/CatalogMain"
import { Header } from "@/widgets/Header"
import { Box } from "@mantine/core"

interface CatalogPageProps {
    id: string;
}

const repo = new CategoriesRepo();

export const CatalogPage = ({id}: CatalogPageProps) => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <CatalogMain categoryId={id}></CatalogMain>
        </Box>
    )
}