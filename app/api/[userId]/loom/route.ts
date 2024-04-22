//Route used to POST a loom
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'
import { LoomDocument } from '@/app/resources/types/dbdocuments'



//Inserts a Loom in the loom collection
export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const userId = params.userId

    try {
        const db = await dbConnection() as Db
        const body = await req.json();
        const { loom } = body.values
        const { shafts, treadles, brand, type }:Loom=loom

        let newDocument:LoomDocument  = { userId, shafts, treadles, brand, type}
        let dbResponse = await db.collection('looms').insertOne(newDocument)

        return NextResponse.json({createdId:dbResponse.insertedId.toString()}, { status: 201 });
    } catch (error) {
        console.log('api/[user]/loom', error);
        return new NextResponse(
            'Ooops, something went wrong when posting the weave',
            { status: 500 }
        );
    }
}

