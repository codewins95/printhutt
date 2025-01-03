import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/userModel'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export const POST = async (request: NextRequest) => {
    try {
        const { id } = await getDataFromToken(request)
        const user = await UserModel.findOne({ _id: id });

        return NextResponse.json({
            message: "User Found",
            success: true,
            user: user
        }, { status: 200 })
    } catch (error: unknown) {
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 });
    }
}