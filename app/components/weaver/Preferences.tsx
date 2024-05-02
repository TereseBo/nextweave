'use client'
import './preferences.scss'

import { useRouter } from 'next/navigation'

import { lowerAccessoryGridLimit, upperAccessoryGridLimit } from '@/app/resources/constants/weaveDefaults'
import { useWeaveContext } from '@/app/resources/contexts/weavecontext'

export function Preferences() {

    const { treadles, setTreadles, shafts, setShafts } = useWeaveContext()
    const router = useRouter()

    //Validation of the content in in staate before generating a grid in draft
    function validateStateData() {
        let message = ''

        if (treadles < lowerAccessoryGridLimit || treadles > upperAccessoryGridLimit) { message = `Please enter a number of shafts and treadles between ${lowerAccessoryGridLimit} and ${upperAccessoryGridLimit}.` }
        if (shafts < lowerAccessoryGridLimit || shafts > upperAccessoryGridLimit) { message = `Please enter a number of shafts and treadles between ${lowerAccessoryGridLimit} and ${upperAccessoryGridLimit}.` }

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

        e.preventDefault()

        if (!validateStateData()) return

        router.push('/weaver/draft')
    }

    return (
        <div className="settings-form-container" onSubmit={handleSubmit}>
            <form id="preferences-form">
                <h3 className="form-header">Loom information</h3>
                <div>
                    <label htmlFor="shafts">Number of shafts</label>
                    <input type="number" name="shafts" id="shafts" min={lowerAccessoryGridLimit} max={upperAccessoryGridLimit} placeholder={shafts.toString()} onChange={(e) => { updateShaft(e) }} required={true} />
                </div>
                <div>
                    <label htmlFor="thredles">Number of thredles</label>
                    <input type="number" name="thredles" id="thredles" min={lowerAccessoryGridLimit} max={upperAccessoryGridLimit} placeholder={treadles.toString()} onChange={(e) => { updateTreadle(e) }} required={true} />
                </div>
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}