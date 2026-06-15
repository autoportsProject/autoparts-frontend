import { PagedList, ProductCreateDto, ProductDto, ProductListItemDto, ProductPriceUpdateDto, ProductQuery, ProductStockUpdateDto, ProductUpdateDto } from "@/domain";

export interface IProductsRepo {
    getAll(query: ProductQuery): Promise<PagedList<ProductListItemDto>>;
    getById(id: string): Promise<ProductDto>;
    create(req: ProductCreateDto): Promise<ProductDto>;
    update(id: string, req: ProductUpdateDto): Promise<ProductDto>;
    delete(id: string): Promise<void>;

    updateStock(id: string, req: ProductStockUpdateDto): Promise<void>;
    updatePrice(id: string, req: ProductPriceUpdateDto): Promise<void>;
}