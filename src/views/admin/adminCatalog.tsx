"use client";

import { AdminHeader } from "@/widgets/admin/AdminHeader";
import { CatalogMain } from "@/widgets/admin/catalog/id/CatalogMain";
import { Box } from "@mantine/core";

interface PageProps {
    id: string;
}

export const AdminCatalogPage = ({id}: PageProps) => {
    return (
        <Box mih="100vh">
            <AdminHeader></AdminHeader>
            <CatalogMain id={id}></CatalogMain>
        </Box>
    )
}