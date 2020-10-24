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
    product_id: string;
    product_name: string;
    category: string;
    category_id: string;
    sub_category: string;
    product_description: string;
    weight: number;
    unit: string;
    description: string;
    imageurl: string;
    original_price: number;
    discount_price: number;
    quantity?: number;
    total_quantity: number;
    available_quantity: number;
    product_origin: string;
    weights: Weight[]
}

export class Weight {
    weight: number;
    unit: string;
    description: string;
    imageurl: string;
    original_price: number;
    discount_price: number;
    quantity?: number;
    total_quantity: number;
    available_quantity: number;
    Default: boolean;
}
