import './draft.scss'

import { useEffect, useState } from 'react'

import { Grid } from '@/app/components/draft/draft/Grid'
import { Errormsg } from '@/app/components/zSharedComponents/Errormsg'

import { readWeaveObject } from '../weaveObjHandler/set/readWeaveObject'
import { Weave } from './Weave'


export function StateDraft(props: { weaveObj: WeaveObject}){

    console.log(props.weaveObj.shafts)
    console.log(props.weaveObj)

    const[treadleGrid, setTreadleGrid]=useState<grid>([['']])
    const [ tieUpGrid, setTieUpGrid]=useState<grid>([['']])
    const [warpGrid, setWarpGrid]=useState<grid>([['']])

  useEffect(()=>{
    if(Object.keys(props.weaveObj).length > 0){
    const grids= readWeaveObject({...props.weaveObj})
    setTieUpGrid(grids.tieupGrid)
    setWarpGrid(grids.warpGrid)
    setTreadleGrid(grids.treadleGrid)
    }
  },[props.weaveObj])



    return (
        (treadleGrid && tieUpGrid && warpGrid) ? (
            <div className="draft">
                <div className="partial">
                    <Weave /> <Grid content={treadleGrid} type='treadle' />
                </div>
                <div className="partial">
                    <Grid content={warpGrid} type='warp'  /> <Grid content={tieUpGrid} type='tieup'/>
                </div>
            </div>) : (<Errormsg text='Ooops something went wrong when creating the draft, please try again' />)
    )

}