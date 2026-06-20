import { AdminCatalogPage } from "@/views/admin/adminCatalog";

interface Props {
    params: Promise<{id: string}>;
}

export default async function CategoryRoute({params}: Props) {
    const {id} = await params;

    return <AdminCatalogPage id={id}></AdminCatalogPage>
}