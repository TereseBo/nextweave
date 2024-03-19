
//Route for actions on single weaves owned by a user
import { Db } from 'mongodb';
import { NextResponse } from 'next/server';

import { dbConnection } from '@/app/resources/db/mongodb'
import { Draft } from '@/app/resources/types/dbdocuments'

export async function GET(
    req: Request,

) {
    try {

        return NextResponse.json('Reached route api/[user]/weaves/[tag]', { status: 200 });
    } catch (error) {
        console.log('api/filehandler', error);
        return new NextResponse(
            'Ooops, something went wrong when getting the route',
            { status: 500 }
        );
    }
}

//Inserts a Draft in the draft collection
export async function POST(
    req: Request,

) {
    try {
        const db = await dbConnection() as Db
        const body = await req.json();
        const { weaveObject, user } = body.values
        let newDocument: Draft = { userId: user, name: 'One', weave: weaveObject, created: Date.now(), updated: Date.now(), public: false }
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