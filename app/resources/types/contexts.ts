
export type WeaveContextType = {
    treadleGrid: grid | undefined,
    warpGrid: grid | undefined,
    tieUpGrid: grid | undefined,
    draftHeight: number,
    draftWidth: number,
    shafts: number,
    setShafts: (newValue: number) => void,
    treadles: number,
    setTreadles: (newValue: number) => void,
    // reSizeGrid:(gridName: gridName, height: number, width: number)=>void
    //Related to color
    warpColors: colorCollection,
    weftColors: colorCollection
    updateCell: (cellId: string) => void,
    currentColor: color,
    setCurrentColor: (newColor: color) => void,
    colorChange: (previousColorId: string, previousColor: color) => void,
    initiateGrids: () => void,
    updateGrid: (name: gridName, newValue: grid) => void,
    upSetGrids: (weaveObj: WeaveObject) => void,
    emptyGrids:()=>void
    /*     resizeGrid:(gridName:string, width:number, height:number)=> void,
        updateGrid:(x:number, y:number, color:color)=> void, */
    /*     updateWarp:(width:number, height:number)=> void, 
        updateDraft:(width:number, height:number)=> void,
        updateTreadle:(width:number, height:number)=> void, */

}

export type UserContextType = {
    //User
    user: string | null,
    setUser: (newValue: string | null) => void,

    //Resources owned by the user
    //Drafts
    drafts: DraftList | null,
    updateDraft: (_id: string, ...updates: any) => void,
    removeDraft: (_id: string) => void,
    getDrafts:(userId:string)=>void

    //Looms
    looms: LoomList | null,
    updateLooms:(id: string|undefined, updatedLoom:Loom)=> void,
    removeLoom:(id: string) => void,

    //Reeds
    reeds:ReedList|null,
    updateReeds:(_id:string|undefined, updatedReed:Reed)=>void,
    removeReed:(_id:string)=>void,


}