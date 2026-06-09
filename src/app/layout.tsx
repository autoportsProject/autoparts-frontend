import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

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
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}
