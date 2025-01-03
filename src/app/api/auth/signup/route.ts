import { connect } from '@/dbConfig/dbConfig'
import UserModel from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, email, password, number } = reqBody

        if (!username || !email || !password || !number) {
            return NextResponse.json({
                message: "All fields are required",
                success: false,
            }, { status: 400 });
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return NextResponse.json({
                error: 'User already exit',
            }, { status: 400 })
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password.toString(), salt);


        const newUser = new UserModel({
            username,
            email,
            number,
            password: hashedPassword
        })

        const saveUser = await newUser.save()

        //await sendEmail({ email, emailType: 'VERIFY', userId: saveUser._id })

        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            saveUser
        })


    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message || 'Internal server error',
        }, { status: 500 });
    }
}