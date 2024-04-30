'use client'
import './preferences.scss'

import { useRouter } from 'next/navigation'

import { lowerGridLimit, upperShaftLimit } from '@/app/resources/constants/weaveDefaults'
import { useWeaveContext } from '@/app/resources/contexts/weavecontext'

export function Preferences() {

    const { treadles, setTreadles, shafts, setShafts } = useWeaveContext()
    const router = useRouter()

    //Validation of the content in editedLoomState, is to be used before submission of data to DB
    function validateFormData(value:number) {
        let message = ''

        if (value < lowerGridLimit || value > upperShaftLimit ) { message = `Please enter a number of shafts and treadles between ${lowerGridLimit} and ${upperShaftLimit}.` }
        
        if (message === '') {
            return true
        } else {
            alert(message)
            return false
        }
    }
    function updateTreadle(e: React.ChangeEvent<HTMLInputElement>): void {
        setTreadles(+e.target.value)
    }

    function updateShaft(e: React.ChangeEvent<HTMLInputElement>): void {
        setShafts(+e.target.value)
    }
    function handleSubmit(e: React.FormEvent) {

        console.log(e)
        e.preventDefault()
        router.push('/weaver/draft')
    }

    return (
        <div className="settings-form-container" onSubmit={handleSubmit}>
            <form id="preferences-form">
                <h3 className="form-header">Loom information</h3>
                <div>
                    <label htmlFor="shafts">Number of shafts</label>
                    <input type="number" name="shafts" id="shafts" min={lowerGridLimit} max={upperShaftLimit} placeholder={shafts.toString()} onChange={(e) => { updateShaft(e) }} />
                </div>
                <div>
                    <label htmlFor="thredles">Number of thredles</label>
                    <input type="number" name="thredles" id="thredles" min={lowerGridLimit} max={upperShaftLimit} placeholder={treadles.toString()} onChange={(e) => { updateTreadle(e) }} />
                </div>
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}