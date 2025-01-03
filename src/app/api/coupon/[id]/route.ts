import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Coupon from '@/models/couponModel';
import mongoose from 'mongoose';

connect()

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
       const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const post = await Coupon.findById(id);
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
        if (role !== 'admin') return NextResponse.json( { success: false, message: 'Unauthorized' }, { status: 401 });
    
        const { 
            code, 
            description, 
            discountType, 
            discountValue, 
            minimumPurchaseAmount, 
            maxDiscountAmount, 
            validFrom, 
            validUntil, 
            usageLimit, 
            isActive } = await request.json();


        const existing = await Coupon.findById(id);

        if (!existing) {
            return NextResponse.json(
                { error: 'Coupon not found' },
                { status: 404 }
            );
        }

        existing.code = code || existing.code;
        existing.description = description || existing.description;
        existing.discountType = discountType || existing.discountType;
        existing.discountValue = discountValue || existing.discountValue;
        existing.minimumPurchaseAmount = minimumPurchaseAmount || existing.minimumPurchaseAmount;
        existing.maxDiscountAmount = maxDiscountAmount || existing.maxDiscountAmount;
        existing.validFrom = validFrom || existing.validFrom;
        existing.validUntil = validUntil || existing.validUntil;
        existing.usageLimit = usageLimit || existing.usageLimit;
        existing.isActive = isActive || existing.isActive;
        
        await existing.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Coupon updated successfully',
                data: existing,
            },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Failed to update' },
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

        const deleteData = await Coupon.findByIdAndDelete(id);

        if (!deleteData) {
            return NextResponse.json({ error: "Return not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Return Deleted successfully!",
        });

    } catch {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}

