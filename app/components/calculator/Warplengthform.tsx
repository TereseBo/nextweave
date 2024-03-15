'use client'
//TODO: Fix style
//TODO: Add comments
//TODO: Cleanup
import './warplengthform.scss'

import { useState } from 'react'

import { calculateNewWarpLength } from '@/app/components/calculator/functions/warplength'

import { Formsection } from './Formsection'

export function Warplengthform() {
    const [warpData, setWarpData] = useState({
        waste: 50,
        lash_on: 50,
        take_up: 10,
        items: [] as Item[],
        shrinkage: 15,
        total: 100,
    })

    //Recalculates and updates state on change in form
    function formChangeHandler(e: React.ChangeEvent<HTMLFormElement>) {
        const inputValue = +e.target.value
        const fieldId = e.target.id
        const newState = calculateNewWarpLength(fieldId, inputValue, { ...warpData })
        setWarpData(newState)
    }

    return (
        <form id="warplength-form" name="warplength-form" onChange={formChangeHandler} >
            <h3 className="form-header">Warp Length</h3>
            <Formsection>
                <label className="sectionlabel" htmlFor="waste">Loom waste: </label>
                <input className={warpData.total >= (warpData.waste + warpData.lash_on) ? 'sectioninput' : 'sectioninput notMatching'} type="number" id="waste" name="loom-waste" min="1" max="99" value={Number(warpData.waste).toString()} onChange={(e) => formChangeHandler} /> <p className="unit">cm</p>
            </Formsection>
            <Formsection>
                <label className="sectionlabel" htmlFor="lash_on">Lashing on: </label>
                <input className={warpData.total >= (warpData.waste + warpData.lash_on) ? 'sectioninput' : 'sectioninput notMatching'} type="number" id="lash_on" name="lash-on" min="1" max="99" value={Number(warpData.lash_on).toString()} onChange={(e) => formChangeHandler} /> <p className="unit">cm</p>
            </Formsection>
            <Formsection>
                <label className="sectionlabel" htmlFor="take_up">Take-up: </label>
                <input className="sectioninput" type="number" id="take_up" name="take_up" min="1" max="99" value={Number(warpData.take_up).toString()} onChange={(e) => formChangeHandler} /> <p className="unit"> %</p>
            </Formsection>
            <Formsection>
                <label className="sectionlabel" htmlFor="shrinkage">Shrinkage: </label>
                <input className="sectioninput" type="number" id="shrinkage" name="shrinkage" min="1" max="50" value={Number(warpData.shrinkage).toString()} onChange={(e) => formChangeHandler} /><p className="unit"> %</p>
            </Formsection>
            <Formsection>
                <label className="sectionlabel" htmlFor="items">Nr of items: </label>
                <input className="sectioninput" type="number" id="items" name="items" min="1" max="99"
                    value={Number(warpData.items.length).toString()} onChange={(e) => formChangeHandler} />
            </Formsection>
            <div id="items-container">
                {warpData.items.map((item, index) =>
                (
                    <div key={index} className="item-data" id="item-box">
                        <h6>{`Piece ${index + 1}`}</h6>

                        <Formsection>
                            <label className="sectionlabel" htmlFor={`piece_${index}_length`}>Item length:</label>
                            <input className="sectionlabel" type="number" data-unit="cm" id={`piece:${index}:length`} name={`piece:${index}:length`} min="1" max="10000" value={Number(item['length']).toString()} onChange={(e) => formChangeHandler} /> cm
                        </Formsection>
                        <Formsection>
                            <label className="sectionlabel" htmlFor={`piece_${index}_firsthem`}>Fringe / hem:</label>
                            <input type="number" data-unit="cm" id={`piece:${index}:firsthem`} name={`piece:${index}:firsthem`} min="1" max="99" value={Number(item['firsthem']).toString()} onChange={(e) => formChangeHandler} />
                            cm
                        </Formsection>
                        <Formsection>
                            <label className="sectionlabel" htmlFor={`piece_${index}_secondhem`}>Fringe / hem:</label>
                            <input type="number" data-unit="cm" id={`piece:${index}:secondhem`} name={`piece:${index}:secondhem`} min="1" max="99" value={Number(item['secondhem']).toString()} onChange={(e) => formChangeHandler} />
                            cm
                        </Formsection>
                    </div>
                )
                )}
            </div>
            <Formsection>
                <label className="sectionlabel" htmlFor="total">Warp length: </label>
                <input className="sectioninput" type="number" id="total" name="total" min="1" max="10000" value={Number(warpData.total).toString()} onChange={(e) => formChangeHandler} />
                <p className="unit"> cm</p>
            </Formsection>
        </form>
    )
}