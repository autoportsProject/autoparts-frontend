import { IProductsRepo, PagedList, ProductCreateDto, ProductDto, ProductListItemDto, ProductPriceUpdateDto, ProductQuery, ProductStockUpdateDto, ProductUpdateDto } from "@/domain";
import api from "../api/axiosInstance";

export class ProductsRepo implements IProductsRepo {
    async getAll(query: ProductQuery): Promise<PagedList<ProductListItemDto>> {
        const res = await api.get<PagedList<ProductListItemDto>>("/products", {
            params: query
        });
        return res.data;
    }
    async getById(id: string): Promise<ProductDto> {
        const res = await api.get<ProductDto>(`/products/${id}`);
        return res.data;
    }
    async create(req: ProductCreateDto): Promise<ProductDto> {
        const res = await api.post<ProductDto>("/products", req);
        return res.data;
    }
    async update(id: string, req: ProductUpdateDto): Promise<ProductDto> {
        const res = await api.put<ProductDto>(`/products/${id}`, req);
        return res.data;
    }
    async delete(id: string): Promise<void> {
        await api.delete(`/products/${id}`);
    }
    async updateStock(id: string, req: ProductStockUpdateDto): Promise<void> {
        await api.patch(`/products/${id}/stock`, req);
    }
    async updatePrice(id: string, req: ProductPriceUpdateDto): Promise<void> {
        await api.patch(`/products/${id}/price`, req);
    }   
}