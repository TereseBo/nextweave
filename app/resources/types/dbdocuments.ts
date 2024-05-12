import { ObjectId } from 'mongodb';
import * as mongoDB from 'mongodb'

interface DraftDocument extends mongoDB.Document {
    _id?: ObjectId,
    owner: string,
    weave: WeaveObject,
    created: number,
    updated: number,
    public: Boolean
}

interface LoomDocument extends mongoDB.Document {
    _id?: ObjectId,
    owner: string,
    shafts: number,
    treadles: number,
    weavewidth:number,
    brand: string,
    type:LoomType,

}


interface ReedDocument extends mongoDB.Document {
    _id?: ObjectId,
    owner: string,
    dents: number,
    section: number,
    unit: 'cm' | 'in',
    length: number
}

type DraftDocumentList = DraftDocument[]
type LoomDocumentList=LoomDocument[]
type ReedDocumentList=Reed[]



export type { DraftDocument, DraftDocumentList, LoomDocument, LoomDocumentList, ReedDocument, ReedDocumentList}