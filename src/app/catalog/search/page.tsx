"use client";

import { SearchResultPage } from "@/views/catalog/searchResult";
import { useSearchParams } from "next/navigation";

export default function SearchRoute() {
    const searchParams = useSearchParams();
    const query = searchParams.get("search") ?? "";

    return <SearchResultPage query={query}></SearchResultPage>
}