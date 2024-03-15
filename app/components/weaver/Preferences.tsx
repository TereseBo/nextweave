'use client'
import './preferences.scss'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'

import { WeaveContext } from '@/app/resources/contexts/weavecontext'

export function Preferences() {

    const { treadles, setTreadles, shafts, setShafts } = useContext(WeaveContext) as WeaveContextType
    const router = useRouter()
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
        <div className="form-container" onSubmit={handleSubmit}>
            <form id="preferences-form">
                <h3 className="form-header">Loom information</h3>
                <div>
                    <label htmlFor="shafts">Number of shafts</label>
                    <input type="number" name="shafts" id="shafts" placeholder={shafts.toString()} onChange={(e) => { updateShaft(e) }} />
                </div>
                <div>
                    <label htmlFor="thredles">Number of thredles</label>
                    <input type="number" name="thredles" id="thredles" placeholder={treadles.toString()} onChange={(e) => { updateTreadle(e) }} />
                </div>
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}