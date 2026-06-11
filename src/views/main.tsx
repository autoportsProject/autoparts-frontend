import { Header } from "@/widgets/Header"
import { Main } from "@/widgets/main/Main";
import { Box } from "@mantine/core"

export const MainPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <Main></Main>
        </Box>
    )
}