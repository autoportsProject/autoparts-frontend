"use client";

import { SearchResultPage } from "@/views/catalog/searchResult";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get("search") ?? "";

    return <SearchResultPage query={query}></SearchResultPage>
}

export default function SearchRoute() {
    return (
        <Suspense>
            <SearchContent></SearchContent>
        </Suspense>
    )
}