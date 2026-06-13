import { CatalogMain } from "@/widgets/catalog/CatalogMain"
import { Header } from "@/widgets/Header"
import { Box } from "@mantine/core"

interface CatalogPageProps {
    slug: string;
}

export const CatalogPage = ({slug}: CatalogPageProps) => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <CatalogMain categoryName={slug}></CatalogMain>
        </Box>
    )
}