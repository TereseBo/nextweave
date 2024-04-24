
//Route for actions on multiple looms owned by a user
import { Db } from 'mongodb'
import { NextResponse } from 'next/server'

import { dbConnection } from '@/app/resources/db/mongodb'


export async function GET(
    req: Request,
    { params }: { params: { userId: string } }) {
    //Fetches all looms for the user
    const userId = params.userId
    console.log('params')
        console.log(params)
        console.log('userId')
    console.log(userId)
    if(!userId){
        return new NextResponse('Unauthorized', { status: 401 });
    }
    

    try {
        const db = await dbConnection() as Db
        let dbResponse = await db.collection('looms').find({ userId: userId }).toArray()

        let loomList: LoomList = []

        //Convert from documents to Looms
        if (dbResponse.length > 0) {
            loomList = dbResponse.map(loomDocument => {
                const stringId = loomDocument._id.toString()
                const loom: Loom = {
                    id: stringId,
                    shafts: loomDocument.shafts,
                    treadles: loomDocument.treadles,
                    brand: loomDocument.brand,
                    type: loomDocument.type,
                }
                return loom
            })
        }

        return NextResponse.json({ loomList }, { status: 200 });

    } catch (error) {
        console.log('api/looms/GET', error);
        return new NextResponse(
            'Ooops, something went very wrong on the server',
            { status: 500 }
        );
    }
}

