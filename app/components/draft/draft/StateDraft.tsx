import './draft.scss'

import { useEffect, useState } from 'react'

import { Grid_contained } from '@/app/components/draft/draft/Grid_contained'
import { createWeave } from '@/app/components/draft/weaveObjHandler/set/writeDraftGrid'
import { Errormsg } from '@/app/components/zSharedComponents/Errormsg'

import { ColorPicker_contained } from '../colorpicker/Colorpicker_contained'
import { readWeaveObject } from '../weaveObjHandler/set/readWeaveObject'

export function StateDraft(props: { weaveObj: WeaveObject }) {

    const [treadleGrid, setTreadleGrid] = useState<grid>([['']])
    const [tieUpGrid, setTieUpGrid] = useState<grid>([['']])
    const [warpGrid, setWarpGrid] = useState<grid>([['']])
    const [weaveGrid, setWeaveGrid] = useState<grid>([['']])


    useEffect(() => {
        if (Object.keys(props.weaveObj).length > 0) {
            const grids = readWeaveObject({ ...props.weaveObj })
            setTieUpGrid(grids.tieUpGrid)
            setWarpGrid(grids.warpGrid)
            setTreadleGrid(grids.treadleGrid)
        }
    }, [props.weaveObj])

    useEffect(() => {

        setWeaveGrid(createWeave({ warpGrid, tieUpGrid, treadleGrid }, treadleGrid.length, warpGrid[0].length))

    }, [treadleGrid, tieUpGrid, warpGrid])


    return (
        (treadleGrid && tieUpGrid && warpGrid) ? (
            <div className="draft" >
                <ColorPicker_contained warpGrid={warpGrid} updateWarpGrid={setWarpGrid} treadleGrid={treadleGrid} updateTreadleGrid={setTreadleGrid}/>
                <div className="partial">
                    <Grid_contained content={weaveGrid} type='weave' setContent={null}/> <Grid_contained content={treadleGrid} type='treadle' setContent={setTreadleGrid}/>
                </div>
                <div className="partial">
                    <Grid_contained content={warpGrid} type='warp' setContent={setWarpGrid} /> <Grid_contained content={tieUpGrid} type='tieup' setContent={setTieUpGrid}/>
                </div>
            </div>) : (<Errormsg text='Ooops something went wrong when creating the draft, please try again' />)
    )

}