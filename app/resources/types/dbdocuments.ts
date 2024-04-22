import { ObjectId } from 'mongodb';
import * as mongoDB from 'mongodb'

interface Draft extends mongoDB.Document {
    _id?: ObjectId,
    userId: string,
    weave: WeaveObject,
    created: number,
    updated: number,
    public: Boolean
}

interface LoomDocument extends mongoDB.Document {
    _id?: ObjectId,
    userId: string,
    shafts: number,
    treadles: number,
    brand: string,
    type:LoomType,

}


interface ReedDocument extends mongoDB.Document {
    _id?: ObjectId,
    userId: string,
    dents: number,
    section: number,
    unit: 'cm' | 'in',
    length: number
}

type rD1 = Omit<Draft, 'created'> & { created: string };
type ReformattedDraft = Omit<Draft, 'updated'> & { updated: string };

type DraftList = ReformattedDraft[]
type LoomDocumentList=LoomDocument[]
type ReedDocumentList=Reed[]



export type { Draft, DraftList, LoomDocument, LoomDocumentList, ReedDocument, ReedDocumentList, ReformattedDraft}