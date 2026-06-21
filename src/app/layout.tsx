import type { Metadata } from "next";
import { Flex, MantineProvider } from "@mantine/core";
import { Footer } from "@/widgets/Footer";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Notifications } from "@mantine/notifications";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
    title: "Магазин автозапчастей",
    description: "Интернет-магазин автозапчастей для иномарок",
};

const nunito = Nunito({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-nunito"
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={nunito.variable} suppressHydrationWarning>
            <body>
                <MantineProvider theme={{fontFamily: "var(--font-nunito), sans-serif"}}>
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
