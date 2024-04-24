//The colorpick form displays wich color is currently picked for clicking in the draft but also displays wich colors are present in warp/weft.
//Previous colors can be picked again by click and replaced in the draft by changeing
import './colorpicker_contained.scss'

import { SetStateAction, useContext, useEffect, useState } from 'react'

import { Colorinput } from '@/app/components/zSharedComponents/Colorinput'
import { useWeaveContext } from '@/app/resources/contexts/weavecontext'
import { replaceColorInGrid } from '@/app/resources/functions/gridHandling/replaceColorInGrid'

import { PreviousColor } from './Previouscolor'
export function ColorPicker_contained(props: { warpGrid: grid, updateWarpGrid: (value: SetStateAction<grid>) => void, treadleGrid: grid, updateTreadleGrid: (value: SetStateAction<grid>) => void }) {

    //TODO: Update styling of duplicated components before removal of the old ones
    const { warpGrid, treadleGrid, updateTreadleGrid, updateWarpGrid } = props

    const [warpColors, setWarpColors] = useState<colorCollection>([])
    const [weftColors, setWeftColors] = useState<colorCollection>([])

    const { currentColor, setCurrentColor } = useWeaveContext()

    //Keeps the state for warpcolors on updated
    useEffect(() => {
        if (!warpGrid) {
            setWarpColors([])
            return
        }
        let uniqueColors: color[] = []
        warpGrid.forEach(row => {
            let colors = row.filter((color) => color != '' && !uniqueColors.includes(color))
            uniqueColors = uniqueColors.concat(colors)
        })
        setWarpColors(Array.from(new Set(uniqueColors)))
    }, [warpGrid])

    //Keeps the state for weftcolors on updated
    useEffect(() => {
        if (!treadleGrid) {
            setWeftColors([])
            return
        }
        let uniqueColors: color[] = []
        treadleGrid.forEach(row => {
            let colors = row.filter((color) => color != '' && !uniqueColors.includes(color))
            uniqueColors = uniqueColors.concat(colors)
        })
        setWeftColors(Array.from(new Set(uniqueColors)))
    }, [treadleGrid])

    //Sets the active color
    function updateCurrentColor(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement
        const value = target.value
        setCurrentColor(value)
    }

    //Replaces all instances of a color in the warp with a new value
    function updateWarpColor(e: React.ChangeEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement
        const color = target.value
        const colorInputId = target.id
        const [gridName, previousColor] = colorInputId.split('-') as [gridName, color]
        updateWarpGrid(prevValue => replaceColorInGrid(prevValue, previousColor, color))
    }
    //Replaces all instances of a color in the weft with a new value
    function updateWeftColor(e: React.ChangeEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement
        const color = target.value
        const colorInputId = target.id
        const [gridName, previousColor] = colorInputId.split('-') as [gridName, color]
        updateTreadleGrid(prevValue => replaceColorInGrid(prevValue, previousColor, color))
    }

    return (
        <div className='form-container'>
            <form className='colorpick-form' >
                <div>
                    <p>
                        Pick a color and click <br />
                        to add warp/weft/ tie up.
                    </p>
                </div>
                <div>
                    <div className='color-container'>
                        <div className="color-box">
                            <h3>Current <br />color</h3>
                            <Colorinput id="current-color" label="" value={currentColor} changehandler={updateCurrentColor} clickhandler={undefined} />
                        </div>

                        <div className="color-box" >
                            <h3>Colors in <br />draft</h3>
                            <div className="previous-colors">
                                {(warpColors.length > 0) && (
                                    <PreviousColor header='Warp' clickhandler={updateCurrentColor} changehandler={updateWarpColor} content={warpColors} />)}
                                {(weftColors.length > 0) && (
                                    <PreviousColor header='Weft' clickhandler={updateCurrentColor} changehandler={updateWeftColor} content={weftColors} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}
