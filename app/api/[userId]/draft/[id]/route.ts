//Route for actions on single weaves owned by a user as specified by user and weave Id
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'

export async function GET(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Fetches one weave for the user by _id
    const { userId, id } = params

    const _id = new ObjectId(id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('drafts').findOne({ _id, userId })

        if (!dbResponse) {
            return new NextResponse(null, { status: 204 });
        }

        let draft = dbResponse.weave

        return NextResponse.json({ weaveObject: draft }, { status: 200 });

    } catch (error) {
        console.log('api/draft/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Deletes one weave for the user by id
    const { userId, id } = params

    const _id = new ObjectId(id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('drafts').deleteOne({ _id, userId })
        console.log(dbResponse)
        //
        //

        console.log('Response in patch toute')
        console.log(dbResponse)

        if (dbResponse.deletedCount !== 1) {
            return new NextResponse('No weave to update found', { status: 204 });
        } else {

            return NextResponse.json('Weave updated', { status: 200 });
        }

    } catch (error) {
        console.log('api/draft/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { userId: string, id: string } }) {
    //Updates one weave for the user
    const { userId, id } = params

    const _id = new ObjectId(id)
    console.log(_id)
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {

        const db = await dbConnection() as Db
        const body = await req.json();
        const { weaveObject, publicStatus } = body.values
       
        let dbResponse = await db.collection('drafts').updateOne({ _id, userId }, { $set: { weave: weaveObject, updated: Date.now(), public: publicStatus } })
        console.log('Response in patch toute')
        console.log(dbResponse)

        if (dbResponse.modifiedCount !== 1) {
            return new NextResponse('No weave to update found', { status: 204 });
        } else {

            return NextResponse.json('Weave updated', { status: 200 });
        }

    } catch (error) {
        console.log('api/draft/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}