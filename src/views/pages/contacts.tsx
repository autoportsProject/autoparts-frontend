import { ContactsMain } from "@/widgets/contacts/ContactsMain"
import { Header } from "@/widgets/Header"
import { Box, Container, Title } from "@mantine/core"

export const ContactsPage = () => {
    return (
        <Box mih="100vh">
            <Header></Header>
            <ContactsMain></ContactsMain>
        </Box>
    )
}