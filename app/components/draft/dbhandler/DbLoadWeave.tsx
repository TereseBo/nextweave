//Contains load button to collect from db
import { useContext } from 'react'
import { readWeaveObject } from '@/app/components/draft/filehandler/functions/set/readWeaveObject'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

export function DbLoadWeave() {
    const { updateGrid } = useContext(WeaveContext) as WeaveContextType


    async function clickhandler() {

        try {
            let response = await fetch('/api/weave')
            const body = await response.json();

            const { weaveObject } = body

            upSetGrids(weaveObject)

        } catch (error) {
            console.log(error)
            alert('Ops, please try anoyher one')

        }
    }
        //TODO_Move to context
    function upSetGrids(weaveObj: WeaveObject): void {

        let newGrids = readWeaveObject(weaveObj)

        updateGrid('tieup', newGrids.tieupGrid)
    }


    return (
        <>
            <button id="uploadButton" onClick={clickhandler}>Load
            </button>
        </>

    )

}