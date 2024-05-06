//Route for actions on single reeds owned by a user as specified by user and objectId
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'

export async function GET(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Fetches one reed for the user by _id
    const { userId, id } = params

    const _id = new ObjectId(id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('reeds').findOne({ _id, owner:userId })

        //Return empty if no content is found in DB
        if (!dbResponse) {
            return NextResponse.json(null, { status: 200 });
        }

        //Convert the ReedDocument to a Reed before sending to frontend
        const stringId = dbResponse._id.toString()
        const reed: Reed = {
            id: stringId,
            dents: dbResponse.dents,
            section: dbResponse.section,
            unit: dbResponse.unit,
            length: dbResponse.length,
        }

        return NextResponse.json({ reed: reed }, { status: 200 });

    } catch (error) {
        console.log('api/reed/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Deletes one reed for the user by id
    const { userId, id } = params

    const _id = new ObjectId(id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('reeds').deleteOne({ _id, owner:userId })

        if (dbResponse.deletedCount !== 1) {
            return new NextResponse('No reed to delete found', { status: 200 });
        } else {

            return NextResponse.json('Reed deleted', { status: 200 });
        }

    } catch (error) {
        console.log('api/draft/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Updates one reed for the user
    const { userId, id } = params

    const _id = new ObjectId(id)

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {

        const db = await dbConnection() as Db
        const body = await req.json();
        const { reed } = body.values
        const { dents, section, unit, length}:Reed=reed

        let dbResponse = await db.collection('reeds').updateOne({ _id, owner:userId },  { $set:{dents, section, unit, length} } )

        if (dbResponse.modifiedCount !== 1) {
            return new NextResponse('No reed to update found', { status: 200 });
        } else {

            return NextResponse.json('Reed updated', { status: 200 });
        }

    } catch (error) {
        console.log('api/reed/PUT', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

