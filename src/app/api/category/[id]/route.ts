import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import mongoose from 'mongoose';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { deleteImage, uploadImage } from '@/lib/cloudinary';

connect()

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const post = await Category.findById(id);
        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(post);
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const formData = await request.formData();

        const file = formData.get('imageUrl');

        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }


        let imageUrl;

        if (file && file instanceof File) {
            imageUrl = await uploadImage(file, 'categories', 60, 60);
            await deleteImage(existingCategory.image.public_id);
        } else {
            imageUrl = existingCategory.image;
        }


        existingCategory.name = formData.get('name') || existingCategory.name;
        existingCategory.slug = formData.get('slug') || existingCategory.slug;
        existingCategory.description = formData.get('description') || existingCategory.description;
        existingCategory.metaKeywords = formData.get('metaKeywords') || existingCategory.metaKeywords;
        existingCategory.metaDescription = formData.get('metaDescription') || existingCategory.metaDescription;
        existingCategory.level = formData.get('level') || existingCategory.level;
        existingCategory.status = formData.get('status') || existingCategory.status;
        existingCategory.image = imageUrl;

        await existingCategory.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Category updated successfully',
                data: existingCategory,
            },
            { status: 201 }
        );
    } catch {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const deleteData = await Category.findByIdAndDelete(id);

        if (!deleteData) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        await deleteImage(deleteData.image.public_id);
        return NextResponse.json({
            success: true,
            message: "Category Deleted successfully!",
        });

    } catch {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}


export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }
        const { role } = await getDataFromToken(request);

        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' },{ status: 401 });


        const { status } = await request.json();
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedCategory) {
            return NextResponse.json(
                { success: false, message: 'Category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Successfully updated category"
            },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}