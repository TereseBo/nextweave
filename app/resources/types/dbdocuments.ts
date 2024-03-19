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

export type { Draft, Loom, Reed, User }