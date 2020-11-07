export class SubCategory {
    name: string;
    selected: boolean;
}

export class ProductEntity {
    category: string;
    subcategory: SubCategory[];
    countryoforigin: string[];
    products: Product[];
}

export class Product {
    productId: string;
    productName: string;
    category: string;
    categoryId: string;
    brand: string;
    subCategory: string;
    subCategoryId: string;
    weight: number;
    unit: string;
    description: string;
    imageURL: string;
    originalPrice: number;
    discountPrice: number;
    memberDealDiscount: number;
    promoDealDiscount: number;
    quantity?: number;
    totalQuantity: number;
    availableQuantity: number;
    countryOfOrigin: string;
    listOfWeights: Weight[]
}

export class Weight {
    weight: number;
    unit: string;
    description: string;
    imageURL: string;
    originalPrice: number;
    discountPrice: number;
    quantity?: number;
    totalQuantity: number;
    availableQuantity: number;
    default: boolean;
}
