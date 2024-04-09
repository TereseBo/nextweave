//Types for all warp data

type WarpWidthData = {
    ends: number,
    epc: number,
    width: number,
}

type WarpLengthData={
    waste:number,
    lash_on:number,
    take_up:number,
    shrinkage: number,
    items: Item[],
    total: number
}


type grid=color[][]
type gridName='weave' | 'tieup'|'warp'|'treadle'|'weft'

