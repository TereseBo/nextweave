//Information on reed and it's  threading
type Reed = {
    id:string|undefined,
    dents: number,
    section: number,
    // tph:number,
    //tpd:number,
    unit: ReedUnit ,
    length: number
}

type ReedUnit='cm' | 'in'

type ReedList=Reed[]

//Information on reed and it's  threading
type ReedData = {
    dents: number,
    section: number,
    tph:number,
    tpd:number,
}