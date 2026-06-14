import { CatalogsListMain } from "@/widgets/catalog/CatalogsListMain"
import { Header } from "@/widgets/Header"
import { Box } from "@mantine/core"

export const CatalogsListPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <CatalogsListMain></CatalogsListMain>
        </Box>
    )
}