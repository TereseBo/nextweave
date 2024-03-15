//The colorpick form displays wich color is currently picked for clicking in the draft but also displays wich colors are present in warp/weft.
//Previous colors can be picked again by click and replaced in the draft by changeing
import './colorpicker.scss'

import { useContext } from 'react'

import { Colorinput } from '@/app/components/zSharedComponents/Colorinput'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

import { PreviousColor } from './Previouscolor'

export function ColorPicker({ }) {
    const { weftColors, warpColors, currentColor, setCurrentColor, colorChange } = useContext(WeaveContext) as WeaveContextType

    //Sets the active color
    function updateCurrentColor(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement
        const value = target.value
        setCurrentColor(value)
    }

    //Replaces all instances of a color in the warp with a new value
    function updateWarpColor(e: React.ChangeEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement
        const value = target.value
        console.log(target.id)
        const colorInputId = target.id
        colorChange(colorInputId, value)
    }
    //Replaces all instances of a color in the weft with a new value
    function updateWeftColor(e: React.ChangeEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement
        const value = target.value
        const colorInputId = target.id
        colorChange(colorInputId, value)
    }

    return (
        <div className='form-container'>
            <form id='colorpick-form' >
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
                            <div id="previous-colors">
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
