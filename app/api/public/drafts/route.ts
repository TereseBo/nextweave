//Route for retrieving public drafts
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'

export async function GET(
    req: Request|null
    ) {

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('drafts').find({ public: true }).toArray()

        let publicDraftList: PublicDraftList = []

        if (dbResponse.length > 0) {
            publicDraftList = dbResponse.map(draftDocument => {

                const draft: PublicDraft = {

                    weave:JSON.parse(JSON.stringify(draftDocument.weave)),
                }
                return draft
            })
        }

        return NextResponse.json({ publicDraftList }, { status: 200 });

    } catch (error) {
        console.log('api/drafts/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

