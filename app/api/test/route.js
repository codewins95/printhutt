import '@/lib/db'
import { NextResponse as res } from "next/server"

export const GET = async (request)=>{
    try {
        return res.json({success: true})
    }
    catch(err)
    {
        return res.json(
            {success: false, message: err.message},
            {status: 500}
        )
    }
}