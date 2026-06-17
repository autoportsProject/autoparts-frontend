import type { Metadata } from "next";
import { Flex, MantineProvider } from "@mantine/core";
import { Footer } from "@/widgets/Footer";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
    title: "Магазин автозапчастей",
    description: "Интернет-магазин автозапчастей для иномарок",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body>
                <MantineProvider>
                    <Notifications></Notifications>
                    <QueryProvider>
                        <Flex direction="column" mih="100vh">
                            {children}
                            <Footer></Footer>
                        </Flex>
                    </QueryProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
