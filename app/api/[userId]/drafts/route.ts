//Route for actions on single Drafts owned by a user
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'

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
        let dbResponse = await db.collection('drafts').find({ userId: userId }).toArray()

        let draftList: DraftList = []

        if (dbResponse.length > 0) {
            draftList = dbResponse.map(draftDocument => {
                const stringId = draftDocument._id.toString()
                let creationDate = new Date(draftDocument.created).toDateString()
                let updateDate = new Date(draftDocument.updated).toDateString()

                const draft: Draft = {
                    id:stringId,
                    weave:JSON.parse(JSON.stringify(draftDocument.weave)),
                    creationDate: creationDate,
                    updateDate: updateDate,
                    public:draftDocument.public
                }
                return draft
            })
        }

        return NextResponse.json({ draftList }, { status: 200 });

    } catch (error) {
        console.log('api/drafts/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

