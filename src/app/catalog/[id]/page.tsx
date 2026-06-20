import { CatalogPage } from "@/views/catalog/catalog";

interface Props {
    params: Promise<{id: string}>;
}

export default async function CatalogRoute({params}: Props) {
    const {id} = await params;

    return <CatalogPage id={id}></CatalogPage>
}