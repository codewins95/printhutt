export interface ImageType {
    url: string;
    public_id: string;
    fileType: string;
    file?: File;
}

export interface PaginationData {
    total: number;
    pages: number;
    page: number;
    limit: number;
}


export interface CategoryFormData {
    _id?: string | undefined;
    name: string;
    slug: string;
    description: string;
    metaKeywords: string;
    metaDescription: string;
    level: string;
    imageUrl: string | File;
    status: boolean;
    parentCategory?: string;
    image?: ImageType;
}

export interface Warranty {
    _id: string;
    warrantyType: string;
    durationMonths: string;
    coverage: string;
    claimProcess: string;
}


export interface ShippingInformation {
    _id: string;
    shippingMethod: string;
    shippingFee: string | number;
    shippingTime: string;
    isFreeShipping: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export interface ReturnPolicy {
    _id: string;
    returnPeriod: string;
    restockingFee: string;
    policyDetails: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Offer {
    _id: string;
    offerTitle: string;
    offerDescription: string;
    discountPercentage: number | string;
    validFrom: string;
    validTo: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Coupon {
    _id: string;
    code: string;
    description: string;
    discountType: string | 'percentage' | 'fixed' | 'free_shipping';
    discountValue: number;
    minimumPurchaseAmount: string | number;
    maxDiscountAmount?: string | number;
    validFrom: string;
    validUntil: string;
    usageLimit: number | null;
    usedCount: number;
    applicableProducts: string[];
    applicableCategories: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}


export interface ImageType {
    url: string;
    public_id: string;
    fileType: string;
}

export interface ProductVariant {
    size: string;
    color: string;
    price: number;
    stock: number;
}
export interface Option {
    value: string;
    label: string;
}
export interface ProductFormData {
    title: string;
    slug: string;
    description: string;
    category: string;
    subcategory: string;
    price: number;
    discountType: string;
    discountPrice: number;
    rating: number;
    stock: number;
    tags: string[];
    sku: string;
    weight: number;
    availabilityStatus: string;
    minimumOrderQuantity: number;
    dimensions: string;
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    demoVideo: string;
    imgAlt: string;
    status: boolean;
    ishome: boolean;
    trending: boolean;
    hot: boolean;
    sale: boolean;
    new: boolean;
    isCustomize: boolean;
    images: ImageType[];
    thumbnail: any;
    keywords: string;
    meta_description: string;
    shippingFee: string | number;
    offers: string[];
    isVarientStatus: boolean;
    varient: ProductVariant[];
}

export type ProductUpdateData = {
    title: string;
    slug: string;
    description: string;
    category: string;
    subcategory: string;
    price: number;
    discountType: string;
    discountPrice: number;
    rating: number;
    stock: number;
    tags: [];
    sku: string;
    weight: number;
    availabilityStatus: string;
    dimensions: string;
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    demoVideo: string;
    imgAlt: string;
    status: boolean;
    ishome: boolean;
    trending: boolean;
    hot: boolean;
    sale: boolean;
    new: boolean;
    isCustomize: boolean;
    meta: {
        keywords: string;
        meta_description: string;
    };
    shippingFee: number;
    isVarientStatus: boolean;
    varient: any;
    images?: string[];
    offers: [];
    thumbnail?: {
        url: String,
        public_id: String,
        fileType: String,
    }; // Optional thumbnail property
};

export type FilterState = {
    categories: string[]
    priceRange: [number, number]
    rating: number | null
    tags: string[]
}

export type Product = {
    _id: string
    title: string
    price: number
    category: {
        id: string
        name: string
    }
    rating: number
    tags?: string[]
    thumbnail: {
        url: string
    },
    new: boolean
    sale: boolean
    hot: boolean
    trending: boolean
    images: [{url: string}]
    discountType: string
    discountPrice: number
    stock: number
    slug: string
    isVarientStatus: boolean
    meta?: {
        keywords: string
        meta_description: string
    };
    reviews?: number;
    short_description?: string;
    quantity?: number;
    sku?: string;
   
}
