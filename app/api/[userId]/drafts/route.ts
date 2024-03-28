
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
        let dbResponse = await db.collection('drafts').find({ userId: userId }).toArray()
        

        if (!dbResponse) {
            return new NextResponse('You have no saved weaves', { status: 204 });
        }

        dbResponse.map(draft => {
           let creationDate=new Date( draft.created ).toDateString()
           let updateDate=new Date( draft.updated ).toDateString()
           draft.created=creationDate
           draft.updated=updateDate
            
        })
        const draftList =dbResponse
        console.log(draftList)
        return NextResponse.json({ draftList }, { status: 200 });

    } catch (error) {
        console.log('api/drafts/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

