import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { uploadImage } from '@/lib/cloudinary';
import ProductModel from '@/models/productModel';
import mongoose from 'mongoose';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';

connect();


export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    //const products = await ProductModel.find().populate({path: 'category', Model: Category }).populate({path: 'subcategory', Model: SubCategory });;

    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .populate({ path: 'category', model: Category })
        .populate({path: 'subcategory', model: SubCategory })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ProductModel.countDocuments(query)
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


/*
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const categories = searchParams.get('categories')?.split(',').filter(Boolean) || []
  const minPrice = parseFloat(searchParams.get('minPrice') || '0')
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999')
  const rating = parseInt(searchParams.get('rating') || '0')
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []

  let filteredProducts = [...products]

  // Apply filters
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      categories.includes(p.category.name)
    )
  }

  filteredProducts = filteredProducts.filter(p => 
    p.price >= minPrice && p.price <= maxPrice
  )

  if (rating > 0) {
    filteredProducts = filteredProducts.filter(p => p.rating >= rating)
  }

  if (tags.length > 0) {
    filteredProducts = filteredProducts.filter(p => 
      p.tags?.some(t => tags.includes(t))
    )
  }

  // Pagination
  const perPage = 12
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / perPage)
  const offset = (page - 1) * perPage

  const paginatedProducts = filteredProducts.slice(offset, offset + perPage)

  return NextResponse.json({
    products: paginatedProducts,
    pagination: {
      page,
      perPage,
      total,
      totalPages
    }
  })
}
*/
export async function POST(req: NextRequest) {
  try {

    const { role } = await getDataFromToken(req);
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


    const formData = await req.formData();

    const imagesRaw = formData.getAll('images');
    const thumbnail = formData.get('thumbnail');

    if (!thumbnail || !(thumbnail instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Thumbnail is required and must be a file' },
        { status: 400 }
      );
    }

    const offers = formData.get('offers');
    const offersAsObjectIds = offers ? JSON.parse(offers as string).map((id: string) => new mongoose.Types.ObjectId(id)) : [];

    const tags = formData.get('tags');
    const tagsAsObject = tags ? JSON.parse(tags as string).map((id: string) => id) : [];


    const productData = {
      title: formData.get('title')?.toString() || '',
      slug: formData.get('slug')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      subcategory: formData.get('subcategory')?.toString() || '',
      price: parseFloat(formData.get('price')?.toString() || '0'),
      discountType: formData.get('discountType')?.toString() || 'percentage',
      discountPrice: parseFloat(formData.get('discountPrice')?.toString() || '0'),
      rating: parseInt(formData.get('rating')?.toString() || '0', 10),
      stock: parseInt(formData.get('stock')?.toString() || '0', 10),
      tags: tagsAsObject || '',
      sku: formData.get('sku')?.toString() || '',
      weight: parseFloat(formData.get('weight')?.toString() || '0'),
      availabilityStatus: formData.get('availabilityStatus')?.toString() || 'in_stock',
      dimensions: formData.get('dimensions')?.toString() || '',
      warrantyInformation: formData.get('warrantyInformation')?.toString() || '',
      shippingInformation: formData.get('shippingInformation')?.toString() || '',
      returnPolicy: formData.get('returnPolicy')?.toString() || '',
      demoVideo: formData.get('demoVideo')?.toString() || '',
      imgAlt: formData.get('imgAlt')?.toString() || '',
      status: formData.get('status') === 'true',
      ishome: formData.get('ishome') === 'true',
      trending: formData.get('trending') === 'true',
      hot: formData.get('hot') === 'true',
      sale: formData.get('sale') === 'true',
      new: formData.get('new') === 'true',
      isCustomize: formData.get('isCustomize') === 'true',
      meta: {
        keywords: formData.get('keywords')?.toString() || '',
        meta_description: formData.get('meta_description')?.toString() || '',
      },
      shippingFee: parseFloat(formData.get('shippingFee')?.toString() || '0'),
      offers: offersAsObjectIds || '',
      isVarientStatus: formData.get('isVarientStatus') === 'true',
      varient: JSON.parse(formData.get('varient')?.toString() || '[]'),
    };


    const product = new ProductModel(productData);

    const uploadedImages = await Promise.all(
      imagesRaw.map(async (image) => {
        if (image instanceof File) {
          return uploadImage(image, 'products');
        } else {
          throw new Error('Invalid image file provided.');
        }
      })
    );

    const thumbnailResponse = await uploadImage(thumbnail, 'products/thumbnails');

    product.images = uploadedImages;
    product.thumbnail = thumbnailResponse;

    const savedProduct = await product.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data: savedProduct,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

