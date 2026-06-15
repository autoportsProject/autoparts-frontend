import { Header } from "@/widgets/Header"
import { ProfileMain } from "@/widgets/profile/ProfileMain"
import { Box } from "@mantine/core"

export const ProfilePage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <ProfileMain></ProfileMain>
        </Box>
    )
}