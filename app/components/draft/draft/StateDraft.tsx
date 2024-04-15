import './draft.scss'

import { useEffect, useState } from 'react'

import { Grid } from '@/app/components/draft/draft/Grid'
import { createWeave } from '@/app/components/draft/weaveObjHandler/set/writeDraftGrid'
import { Errormsg } from '@/app/components/zSharedComponents/Errormsg'

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

        const weave = createWeave({ warpGrid, tieUpGrid, treadleGrid }, treadleGrid.length, warpGrid[0].length)
        setWeaveGrid(weave)

    }, [treadleGrid, tieUpGrid, warpGrid])


    return (
        (treadleGrid && tieUpGrid && warpGrid) ? (
            <div className="draft">
                <div className="partial">
                    <Grid content={weaveGrid} type='weave' /> <Grid content={treadleGrid} type='treadle' />
                </div>
                <div className="partial">
                    <Grid content={warpGrid} type='warp' /> <Grid content={tieUpGrid} type='tieup' />
                </div>
            </div>) : (<Errormsg text='Ooops something went wrong when creating the draft, please try again' />)
    )

}