import { ObjectId } from 'mongodb';
import * as mongoDB from 'mongodb'

interface User extends mongoDB.Document {
    _id?: ObjectId;
    name: string
    userId: string
}

interface Draft extends mongoDB.Document {
    _id?: ObjectId,
    userId: string,
    name: string,
    weave: WeaveObject,
    created: number,
    updated: number,
    public: Boolean
}

interface Loom extends mongoDB.Document {
    _id?: ObjectId,
    userId: string,
    shafts: number,
    treadles: number,
    name: string,
}

interface Reed extends mongoDB.Document {
    _id?: ObjectId,
    userId: string,
    dents: number,
    section: number,
    unit: 'cm' | 'in',
    length: number
}
type rD1 = Omit<Draft, 'created'> & { created: string };
type reformattedDraft = Omit<Draft, 'updated'> & { updated: string };
type DraftList =    [reformattedDraft?]



export type { Draft, DraftList, Loom, Reed, reformattedDraft,User }