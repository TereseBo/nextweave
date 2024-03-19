//Contains load button to collect from db
import { useContext } from 'react'
import { useAuth } from '@clerk/nextjs'

import { readWeaveObject } from '@/app/components/draft/filehandler/functions/set/readWeaveObject'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

export function DbLoadWeave() {
    const { updateGrid } = useContext(WeaveContext) as WeaveContextType
    const { userId } = useAuth()

    async function clickhandler() {

        try {
            let response = await fetch(`/api/${userId}/draft`)
            console.log(response)

            if(response.status==200){
            const body = await response.json();

            const { weaveObject } = body

            upSetGrids(weaveObject)
            }else{
                throw new Error
            }

        } catch (error) {
            console.log(error)
            alert('Ops, please try anoyher one')

        }
    }
        //TODO_Move to context
    function upSetGrids(weaveObj: WeaveObject): void {

        let newGrids = readWeaveObject(weaveObj)

        updateGrid('tieup', newGrids.tieupGrid)
        updateGrid('warp', newGrids.warpGrid)
        updateGrid('weft', newGrids.treadleGrid)
    }


    return (
        <>
            <button id="uploadButton" onClick={clickhandler}>Load
            </button>
        </>

    )

}