import { SearchResultMain } from "@/widgets/catalog/SearchResultMain";
import { Header } from "@/widgets/Header"
import { Box } from "@mantine/core"

interface PageProps {
    query: string;
}

export const SearchResultPage = ({query}: PageProps) => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <SearchResultMain query={query}></SearchResultMain>
        </Box>
    )
}