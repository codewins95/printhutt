
import React, { useMemo } from 'react'
import { CategoryFilter } from './filters/category-filter'
import { PriceFilter } from './filters/price-filter'
import { RatingFilter } from './filters/rating-filter'
import { TagFilter } from './filters/tag-filter'
import type { FilterState } from '@/lib/types'
import type { Product } from '@/lib/types/product'

interface ProductSidebarProps {
    products: Product[]
    filters: FilterState
    onFilterChange: (filters: Partial<FilterState>) => void
}

export function ProductSidebar({ products, filters, onFilterChange }: ProductSidebarProps) {
    const categories = useMemo(() => Array.from(new Set(products.map(p => p.category.name))), [products])
    const priceRange = useMemo(() => ({
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price))
    }), [products])
    const tags = useMemo(() => Array.from(new Set(products.flatMap(p => p.tags || []))), [products])

    return (
        <>
            <div className="bb-shop-wrap bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] sticky top-[0]">
                {/* <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
                    <div className="bb-sidebar-title mb-[20px]">
                        <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                            Category
                        </h3>
                    </div>
                    <div className="bb-sidebar-contact">
                        <ul>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        clothes
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Bags
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Shoes
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Cosmetics
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Electrics
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Phone
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Watch
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
                    <div className="bb-sidebar-title mb-[20px]">
                        <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                            Product Type
                        </h3>
                    </div>
                    <div className="bb-sidebar-contact">
                        <ul>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Pre
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>
                            <li className="relative block mb-[14px]">
                                <div className="bb-sidebar-block-item relative">
                                    <input
                                        type="checkbox"
                                        className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                                    />
                                    <a
                                        
                                        className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer"
                                    >
                                        Customize
                                    </a>
                                    <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="bb-sidebar-block p-[20px]">
                    <div className="bb-sidebar-title mb-[20px]">
                        <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750]">
                            Tags
                        </h3>
                    </div>
                    <div className="bb-tags">
                        <ul className="flex flex-wrap m-[-5px]">
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Neon
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Name Lamp
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    3D
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Neon Sign
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Keychain
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Hot
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Offer
                                </a>
                            </li>
                            <li className="transition-all duration-[0.3s] ease-in-out m-[5px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] hover:bg-[#6c7fd8] cursor-pointer">
                                <a
                                    
                                    className="font-Poppins text-[13px] capitalize font-light leading-[28px] tracking-[0.03rem] text-[#686e7d]"
                                >
                                    Gift
                                </a>
                            </li>

                        </ul>
                    </div>
                </div> */}

                <CategoryFilter
                    categories={categories}
                    selectedCategories={filters.categories}
                    onChange={(categories) => onFilterChange({ categories })}
                />
                <PriceFilter
                    range={priceRange}
                    value={filters.priceRange}
                    onChange={(priceRange) => onFilterChange({ priceRange })}
                />
                <RatingFilter
                    selectedRating={filters.rating}
                    onChange={(rating) => onFilterChange({ rating })}
                />
                <TagFilter
                    tags={tags}
                    selectedTags={filters.tags}
                    onChange={(tags) => onFilterChange({ tags })}
                />
            </div>
        </>
    )
}
