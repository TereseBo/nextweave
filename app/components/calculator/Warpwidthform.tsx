//Form for performing weave with calculations
'use client'
import './warpwidthform.scss'

import { useState } from 'react'

import { reedMatch } from '@/app/components/calculator/functions/reed'
import { calculateWarpWidth } from '@/app/components/calculator/functions/warpwidth'

import { Formsection } from './Formsection'

export function Warpwidthform() {
    const [reedData, setReedData] = useState(
        {
            dents: 50,
            section: 10,
            tph: 1,
            tpd: 2,
        },
    )
    const [warpData, setWarpData] = useState(
        {
            ends: 750,
            epc: 10,
            width: 75,
        }
    )
    const [weftEpc, setWeftEpc] = useState(10)

    //Recalculates and updates state on change in form
    function formChangeHandler(e: React.ChangeEvent<HTMLFormElement>) {

        const inputValue = +e.target.value
        const fieldId = e.target.id
        const newState = calculateWarpWidth(fieldId, inputValue, { ...warpData }, { ...reedData },)
        setReedData(newState['reed'])
        setWarpData(newState['warp'])
    }

    return (
        <form id="warpwidth-form" onChange={formChangeHandler} name="warpwidth-form" >
            <h3 className="form-header">Warp width</h3>

            <Formsection>
                <label>Reed:</label>
                <input className={reedMatch(warpData, reedData) ? '' : 'sectioninput notMatching'} type="number" id="dents" name="dents" min="1" max="100" value={Number(reedData.dents).toString()} onChange={(e) => formChangeHandler} />
                /
                <input className={reedMatch(warpData, reedData) ? '' : 'sectioninput notMatching'} type="number" id="section" name="section" min="1" max="100" value={Number(reedData.section).toString()} onChange={(e) => formChangeHandler} /> cm
            </Formsection>

            <Formsection>
                <label>Threding:</label>
                <input type="number" id="tph" name="" min="1" max="10" value={Number(reedData.tph).toString()} onChange={(e) => formChangeHandler} />

                <label htmlFor="tph">/heddle </label>
                <input type="number" id="tpd" name="tpd" min="1" max="10" value={Number(reedData.tpd).toString()} onChange={(e) => formChangeHandler} />
                <label htmlFor="tpd">/dent </label>
            </Formsection>

            <Formsection>
                <label>Ends/cm:</label>
                <label htmlFor="epc">warp </label>
                <input type="number" id="epc" name="epc" min="1" max="100" value={Number(warpData.epc).toString()} onChange={(e) => formChangeHandler} />
                <label htmlFor="weft-epc">weft </label>
                <input type="number" id="weft-epc" name="weft-epc" min="1" max="100" value={Number(weftEpc).toString()} onChange={(e) => setWeftEpc(+e.target.value)} />
            </Formsection>

            <Formsection>
                <label>Ends total:</label>
                <label htmlFor="ends">threads </label>
                <input type="number" id="ends" name="ends" min="1" max="2000" value={Number(warpData.ends).toString()} onChange={(e) => formChangeHandler} />
            </Formsection>

            <Formsection>
                <label>Weave width:</label>
                <input type="number" id="width" name="width" min="1" max="10000" value={Number(warpData.width).toString()} onChange={(e) => formChangeHandler} />
                <label htmlFor="width">cm </label>
            </Formsection>

        </form>
    )
}