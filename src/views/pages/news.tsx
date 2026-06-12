import { Header } from "@/widgets/Header"
import { NewsMain } from "@/widgets/news/NewsMain"
import { Box } from "@mantine/core"

export const NewsPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <NewsMain></NewsMain>
        </Box>
    )
}