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

type WeaveContextType={
    treadleGrid:grid|undefined,
    warpGrid:grid|undefined,
    tieUpGrid: grid|undefined,
    draftHeight:number,
    draftWidth: number,
    shafts:number,
   setShafts:( newValue:number)=>void,
    treadles:number,
   setTreadles:(newValue:number)=>void,
   // reSizeGrid:(gridName: gridName, height: number, width: number)=>void
    //Related to color
    warpColors:colorCollection,
    weftColors:colorCollection
    updateCell:(cellId:string)=>void,
    currentColor:color,
    setCurrentColor:(newColor:color)=>void,
    colorChange:(previousColorId:string, previousColor:color)=>void,
    initiateGrids:()=>void,
    updateGrid:(name:gridName, newValue:grid)=>void,
/*     resizeGrid:(gridName:string, width:number, height:number)=> void,
    updateGrid:(x:number, y:number, color:color)=> void, */
/*     updateWarp:(width:number, height:number)=> void, 
    updateDraft:(width:number, height:number)=> void,
    updateTreadle:(width:number, height:number)=> void, */

}