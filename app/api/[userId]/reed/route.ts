//Route used to POST a reed
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'
import { ReedDocument } from '@/app/resources/types/dbdocuments'



//Inserts a reed in the reeds collection
export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const userId = params.userId

    try {
        const db = await dbConnection() as Db
        const body = await req.json();
        const { reed } = body.values
        const { dents, section, unit, length }: Reed = reed

        let newDocument: ReedDocument = { userId, dents, section, unit, length }
        let dbResponse = await db.collection('reeds').insertOne(newDocument)

        return NextResponse.json({ createdId: dbResponse.insertedId.toString() }, { status: 201 });
    } catch (error) {
        console.log('api/[user]/reed', error);
        return new NextResponse(
            'Ooops, something went wrong when posting the reed',
            { status: 500 }
        );
    }
}

