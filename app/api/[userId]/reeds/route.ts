//Route for actions on multiple reeds owned by a user
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'


export async function GET(
    req: Request,
    { params }: { params: { userId: string } }) {
    //Fetches all reeds for the user
    const userId = params.userId
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('reeds').find({ userId: userId }).toArray()

        let reedList:ReedList=[]

        //Convert from documents to Reeds
        if (dbResponse.length > 0) {
            reedList = dbResponse.map(loomDocument => {
                const stringId = loomDocument._id.toString()
                const reed: Reed = {
                    id: stringId,
                    dents: loomDocument.dents,
                    section: loomDocument.section,
                    unit: loomDocument.unit,
                    length: loomDocument.length,
                }
                return reed

            })
        }

        console.log(reedList)
        return NextResponse.json({ reedList }, { status: 200 });

    } catch (error) {
        console.log('api/reeds/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}