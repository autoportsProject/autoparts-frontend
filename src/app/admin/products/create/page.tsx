"use client";

import { AdminProductCreatePage } from "@/views/admin/adminProductCreate";
import { Suspense } from "react";

export default function AdminCreateProductRoute() {
    return (
        <Suspense fallback={null}>
            <AdminProductCreatePage></AdminProductCreatePage>
        </Suspense>
    )
}