import { AdminProductPage } from "@/views/admin/adminProduct";

interface Props {
    params: Promise<{id: string}>;
}

export default async function AdminProductRoute({params}: Props) {
    const {id} = await params;
    return <AdminProductPage id={id}></AdminProductPage>
}