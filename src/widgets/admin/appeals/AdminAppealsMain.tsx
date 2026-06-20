import { Center, Container, Loader, Stack, Tabs, Text, Title } from "@mantine/core"
import { AdminLinkText } from "../AdminLinkText"
import styles from "@/shared/styles/admin/appeals/appeals.module.scss";
import { AppealsRepo } from "@/data/repos/AppealsRepo";
import { useAppealsList } from "@/features/appeals/useAppealsList";
import { getErrorMessage } from "@/shared/utils/getError";
import { ClientQuestionDto, SupplierRequestDto } from "@/domain";
import { ClientQuestionCard } from "./ClientQuestionCard";
import { SupplierRequestCard } from "./SupplierRequestCard";

const repo = new AppealsRepo();

export const AdminAppealsMain = () => {
    const {appeals, isLoading, serverError} = useAppealsList(repo);
    const questions = appeals?.filter((a): a is ClientQuestionDto => !("companyName" in a)) ?? [];
    const requests = appeals?.filter((a): a is SupplierRequestDto => "companyName" in a) ?? [];
    return (
        <Container size="100%" px={0} py="xl">
            <Stack gap={45}>
                <Stack gap="sm" px={40}>
                    <AdminLinkText></AdminLinkText>
                    <Title order={1} ta="center">Обращения</Title>
                </Stack>
                {isLoading ? (
                    <Center py="xl">
                        <Loader size="xl"></Loader>
                    </Center>
                ) : (serverError || !appeals) ? (
                    <Text c="red" fw={700} ta="center">Ошибка загрузки обращений {serverError && getErrorMessage(serverError)}</Text>
                ) : (
                    <Tabs defaultValue="questions" classNames={{root: styles.tabsDiv}}>
                        <Tabs.List classNames={{list: styles.tabs}}>
                            <Tabs.Tab classNames={{tab: styles.tab}} value="questions">Вопросы клиентов</Tabs.Tab>
                            <Tabs.Tab classNames={{tab: styles.tab}} value="suppliers">Заявки поставщиков</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="questions" classNames={{panel: styles.panel}}>
                            {questions.map(q => (
                                <ClientQuestionCard key={q.id} question={q}></ClientQuestionCard>
                            ))}
                        </Tabs.Panel>
                        <Tabs.Panel value="suppliers" classNames={{panel: styles.panel}}>
                            {requests.map(r => (
                                <SupplierRequestCard key={r.id} request={r}></SupplierRequestCard>
                            ))}
                        </Tabs.Panel>
                    </Tabs>
                )}
            </Stack>
        </Container>
    )
}