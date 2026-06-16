import { Footer } from "@/widgets/Footer";
import { Flex } from "@mantine/core";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Администратор | АвтоИноМир"
};

export default function AdminLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <Flex direction="column" mih="100vh">
            {children}
        </Flex>
    )
}