import './draft.scss'

import {useEffect, useState } from 'react'

import { Grid_contained } from '@/app/components/draft/draft/Grid_contained'
import { Errormsg } from '@/app/components/zSharedComponents/Errormsg'
import { createWeaveObject } from '@/app/resources/functions/weaveObjHandling/createWeaveObj/createWeaveObject'
import { readWeaveObject } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/readWeaveObject'
import { createWeave } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/writeDraftGrid'

import { ColorPicker_contained } from '../colorpicker/Colorpicker_contained'

export function StateDraft(props: { weaveObj: WeaveObject, updateObj:(value: WeaveObject) => void}) {
const {updateObj, weaveObj}=props
    const [treadleGrid, setTreadleGrid] = useState<grid>([['']])
    const [tieUpGrid, setTieUpGrid] = useState<grid>([['']])
    const [warpGrid, setWarpGrid] = useState<grid>([['']])
    const [weaveGrid, setWeaveGrid] = useState<grid>([['']])


    useEffect(() => {
        if (Object.keys(weaveObj).length > 0) {
            const grids = readWeaveObject({ ...weaveObj })
            setTieUpGrid(grids.tieUpGrid)
            setWarpGrid(grids.warpGrid)
            setTreadleGrid(grids.treadleGrid)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    useEffect(() => {

        setWeaveGrid(createWeave({ warpGrid, tieUpGrid, treadleGrid }, treadleGrid.length, warpGrid[0].length))
        const newObj=createWeaveObject(warpGrid, treadleGrid, tieUpGrid)
       
        updateObj(JSON.parse(JSON.stringify(newObj)))
               
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treadleGrid, tieUpGrid, warpGrid])


    return (
        (treadleGrid && tieUpGrid && warpGrid) ? (
            <div className="draft" >
                <ColorPicker_contained warpGrid={warpGrid} updateWarpGrid={setWarpGrid} treadleGrid={treadleGrid} updateTreadleGrid={setTreadleGrid} />
                <div className="partial">
                    <Grid_contained content={weaveGrid} type='weave' setContent={null} /> <Grid_contained content={treadleGrid} type='treadle' setContent={setTreadleGrid} />
                </div>
                <div className="partial">
                    <Grid_contained content={warpGrid} type='warp' setContent={setWarpGrid} /> <Grid_contained content={tieUpGrid} type='tieup' setContent={setTieUpGrid} />
                </div>
            </div>) : (<Errormsg text='Ooops something went wrong when creating the draft, please try again' />)
    )

}