//Route for actions on single looms owned by a user as specified by user and loom Id
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'

export async function GET(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Fetches one loom for the user by _id
    const { userId, id } = params

    const _id = new ObjectId(id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('looms').findOne({ _id, userId })

        //Return empty if no content is found in DB
        if (!dbResponse) {
            return NextResponse.json(null, { status: 200 });
        }

        //Convert the LoomDocument to a Loom before sending to frontend
        const stringId = dbResponse._id.toString()
        const loom: Loom = {
            id: stringId,
            shafts: dbResponse.shafts,
            treadles: dbResponse.treadles,
            brand: dbResponse.brand,
            type: dbResponse.type,
        }


        return NextResponse.json({ loom: loom }, { status: 200 });

    } catch (error) {
        console.log('api/loom/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Deletes one loom for the user by id
    const { userId, id } = params

    const _id = new ObjectId(id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('looms').deleteOne({ _id, userId })
        console.log(dbResponse)

        console.log('Response in delete toute')
        console.log(dbResponse)

        if (dbResponse.deletedCount !== 1) {
            return new NextResponse('No loom to delete found', { status: 200 });
        } else {

            return NextResponse.json('Loom updated', { status: 200 });
        }

    } catch (error) {
        console.log('api/loom/DELETE', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Updates one loom for the user
    const { userId, id } = params

    const _id = new ObjectId(id)
    console.log(_id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {

        const db = await dbConnection() as Db
        const body = await req.json();
        const { loom } = body.values
        const { shafts, treadles, brand, type }:Loom=loom

        let dbResponse = await db.collection('looms').updateOne({ _id, userId },  { $set:{shafts, treadles, brand, type} } )
        console.log('Response in patch LOOM route')
        console.log(dbResponse)

        if (dbResponse.modifiedCount !== 1) {
            return new NextResponse('No loom to update found', { status: 200 });
        } else {

            return NextResponse.json('Loom updated', { status: 200 });
        }

    } catch (error) {
        console.log('api/Loom/PUT', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}