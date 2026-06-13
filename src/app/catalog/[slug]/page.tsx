import { CatalogPage } from "@/views/catalog/catalog";

interface Props {
    params: Promise<{slug: string}>;
}

export default async function CatalogRoute({params}: Props) {
    const {slug} = await params;

    return <CatalogPage slug={slug}></CatalogPage>
}