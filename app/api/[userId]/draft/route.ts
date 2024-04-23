
//Route for actions on single weaves owned by a user
import { Db } from 'mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'
import { DraftDocument } from '@/app/resources/types/dbdocuments'

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }) {
    //Fetches one draft for the user
    const userId = params.userId
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('drafts').findOne({ userId: userId })

        if (dbResponse) {
            const draftDocument = dbResponse
            const stringId = draftDocument._id.toString()
            let creationDate = new Date(draftDocument.created).toDateString()
            let updateDate = new Date(draftDocument.updated).toDateString()

            const draft: Draft = {
                id: stringId,
                weave: JSON.parse(JSON.stringify(draftDocument.weave)),
                creationDate: creationDate,
                updateDate: updateDate,
                public: draftDocument.public
            }

            return NextResponse.json({ weaveObject: draft }, { status: 200 });
        }
        return new NextResponse('You have no saved weaves', { status: 200 });


    } catch (error) {
        console.log('api/draft/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

//Inserts a Draft in the draft collection
export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const userId = params.userId

    try {
        const db = await dbConnection() as Db
        const body = await req.json();
        const { weaveObject, name } = body.values
        let newDocument: DraftDocument = { userId, name, weave: weaveObject, created: Date.now(), updated: Date.now(), public: false }
        let dbResponse = await db.collection('drafts').insertOne(newDocument)
        console.log(dbResponse)

        return NextResponse.json('Successfully posted WEAVE at route api/weaves/', { status: 201 });
    } catch (error) {
        console.log('api/[user]/weaves/[tag]', error);
        return new NextResponse(
            'Ooops, something went wrong when posting the weave',
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
        let dbResponse = await db.collection('drafts').deleteOne({ _id, userId })

        if (dbResponse.deletedCount !== 1) {
            return new NextResponse('No draft to delete found', { status: 200 });
        } else {

            return NextResponse.json('Draft deleted', { status: 200 });
        }

    } catch (error) {
        console.log('api/draft/DELETE', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}