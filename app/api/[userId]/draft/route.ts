
//Route for actions on single weaves owned by a user
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'
import { Draft } from '@/app/resources/types/dbdocuments'

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }) {
    //Fetches one weave for the user
    const userId = params.userId
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('drafts').findOne({ userId: userId })
        console.log(dbResponse)

        if (!dbResponse) {
            return new NextResponse('You have no saved weaves', { status: 200 });
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
        let newDocument: Draft = { userId, name, weave: weaveObject, created: Date.now(), updated: Date.now(), public: false }
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
    { params }: { params: { userId: string, id:string } }) {
    //Fetches one weave for the user
    const userId = params.userId
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('drafts').findOne({ userId: userId })
        console.log(dbResponse)

        if (!dbResponse) {
            return new NextResponse('You have no saved weaves', { status: 200 });
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