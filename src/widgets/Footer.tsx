import { Box, Center, Text } from "@mantine/core"
import styles from "@/shared/styles/footer/footer.module.scss";

export const Footer = () => {
    return (
        <Box className={styles.footer}>
            <Center>
                <Text c="white" fw={500}>это футер</Text>
            </Center>
        </Box>
    )
}