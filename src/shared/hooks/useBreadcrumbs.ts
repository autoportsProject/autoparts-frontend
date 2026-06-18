import { CategoriesRepo } from "@/data/repos/CategoriesRepo";
import { useCategoriesList } from "@/features/catalogs/useCategoriesList";
import { usePathname } from "next/navigation";

const repo = new CategoriesRepo();

export const useBreadcrumbs = (routeNames: Record<string, string>, options?: {
    homeLabel?: string;
    productsHrefOverride?: string;
    currentEntityName?: string;
}) => {
    const pathname = usePathname();
    const segs = pathname.split("/").filter(Boolean);
    const {categories} = useCategoriesList(repo);

    const resolveUUIDLabel = (id: string) => {
        const category = categories?.find(c => c.id === id);
        if (category)
            return category.name;
        if (options?.currentEntityName)
            return options.currentEntityName;
        return id;
    }

    const base = options?.homeLabel ? [{
        label: options.homeLabel,
        href: "/"
    }] : [];
    const parts = [
        ...base,
        ...segs.map((s,i) => ({
            label: /^[0-9a-f-]{36}$/i.test(s)
                ? resolveUUIDLabel(s)
                : (routeNames[s] ?? s),
            href: (options?.productsHrefOverride && s === "products")
                ? options.productsHrefOverride
                : "/" + segs.slice(0, i + 1).join("/")
        }))
    ];

    return parts;
}