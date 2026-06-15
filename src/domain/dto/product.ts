import { AttributeType } from "../enums/product";

export interface ProductBrandDto {
    id: string;
    name: string;
}

export interface ProductCategoryDto {
    id: string;
    name: string;
}

export interface ProductListItemDto {
    id: string;
    name: string;
    article: string;
    quantity: number;
    price: number;
    inStock: boolean;
    imagePath?: string;
    createdAt: string;
    brand: ProductBrandDto;
    category: ProductCategoryDto;
}

export interface ProductAttributeValueDto {
    attributeId: string;
    attributeName: string;
    type: AttributeType;
    unit?: string;
    value: string;
}

export interface ProductAttributeValueInputDto {
    attributeId: string;
    value: string;
}

export interface ProductDto {
    id: string;
    name: string;
    article: string;
    quantity: number;
    price: number;
    inStock: boolean;
    description?: string;
    imagePath?: string;
    brand: ProductBrandDto;
    category: ProductCategoryDto;
    attributeValues: ProductAttributeValueDto[];
}

export interface ProductCreateDto {
    name: string;
    article: string;
    quantity: number;
    price: number;
    inStock: boolean;
    description?: string;
    imagePath?: string;
    brandId: string;
    categoryId: string;
    attributeValues?: ProductAttributeValueInputDto[];
}

export interface ProductUpdateDto {
    name: string;
    article: string;
    quantity: number;
    price: number;
    inStock: boolean;
    description?: string;
    imagePath?: string;
    brandId: string;
    categoryId: string;
    attributeValues?: ProductAttributeValueInputDto[];
}

export interface ProductStockUpdateDto {
    quantity: number;
    inStock: boolean;
}

export interface ProductPriceUpdateDto {
    price: number;
}

export interface AttributeFilterQuery {
    attributeId: string;
    min?: string;
    max?: string;
    value?: string;
}

export interface ProductQuery {
    brandId?: string;
    categoryId?: string;
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;
    attributeFilters?: AttributeFilterQuery[];
}