import './draft.scss'

import { useContext, useEffect } from 'react'

import { Grid } from '@/app/components/draft/draft/Grid'
import { Errormsg } from '@/app/components/zSharedComponents/Errormsg'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

import { Weave } from './Weave'
export function Draft() {

    const { treadleGrid, warpGrid, tieUpGrid, initiateGrids } = useContext(WeaveContext) as WeaveContextType

    useEffect(() => {
        initiateGrids()
    })

    return (
        (treadleGrid && tieUpGrid && warpGrid) ? (
            <div className="draft">
                <div className="partial">
                    <Weave /> <Grid content={treadleGrid} type='treadle' />
                </div>
                <div className="partial">
                    <Grid content={warpGrid} type='warp' /> <Grid content={tieUpGrid} type='tieup' />
                </div>
            </div>) : (<Errormsg text='Ooops something went wrong when creating the draft, please try again' />)
    )
}


