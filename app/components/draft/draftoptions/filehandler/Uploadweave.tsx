//Contains upload button which accepts json and creates a weaveobject provided the right format
import './uploadweave.scss'

import { useState } from 'react'

import { useWeaveContext } from '@/app/resources/contexts/weavecontext'
import { toggleBool } from '@/app/resources/functions/toggleBool'
import { readWeaveObject } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/readWeaveObject'

export function Uploadweave() {
    const { updateGrid } = useWeaveContext()
    const [displayInput, setDisplayInput] = useState<boolean>(false)

    function upLoadHandler(e: React.ChangeEvent<HTMLInputElement>): void {

        if (e.target.files) {
            var reader = new FileReader();
            reader.onload = (readE) => {
                if (readE.target?.result) {
                    try {
                        let fileContents = readE.target.result as string
                        const obj: WeaveObject = JSON.parse(fileContents);
                        let newGrids = readWeaveObject(obj)

                        updateGrid('tieup', newGrids.tieUpGrid)
                        updateGrid('warp', newGrids.warpGrid)
                        updateGrid('weft', newGrids.treadleGrid)
                    } catch (error) {
                        //TODO:remove log, replace alertbox
                        console.log(error)
                        alert('Please use a different file')

                    }
                }
            }
            reader.readAsText(e.target.files[0]);
        }
    }

    return (
        <>
            <button id="uploadButton" onClick={() => setDisplayInput(toggleBool(displayInput))}>Upload
                <label htmlFor='weaveObject'>
                </label>
                <input className="weave-file" type='file' onChange={(e) => upLoadHandler(e)} name='weaveObject'></input>
            </button>
        </>

    )

}