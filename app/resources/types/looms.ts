
type Loom ={
    id: string|undefined,
    shafts: number,
    treadles: number,
    weavewidth:number,
    brand: string,
    type:LoomType,

}

type LoomList=Loom[]

type LoomType=| 'Countermarch'| 'Rigid heddle'|'Counterbalance'| 'Jack loom'| 'Draw loom'