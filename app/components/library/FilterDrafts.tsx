
import './filterdraft.scss'

import { useEffect, SetStateAction, useState } from 'react'

import { defaultShafts, defaultTreadles, lowerAccessoryGridLimit, upperAccessoryGridLimit } from '@/app/resources/constants/weaveDefaults'
import { PublicDraftCard } from './publicDraftCard'

export function FilterDrafts(props: { publicDrafts: PublicDraftList, setPublicDrafts: (value: SetStateAction<PublicDraftList | null>) => void, filteredDrafts: PublicDraftList | null, setFilteredDrafts: (value: SetStateAction<PublicDraftList | null>) => void }) {
    const { publicDrafts, filteredDrafts, setFilteredDrafts, setPublicDrafts } = props
    const [minShafts, setMinShafts] = useState<number>(defaultShafts - 2)
    const [maxShafts, setMaxShafts] = useState<number>(defaultShafts + 2)

    const [minTreadles, setMinTreadles] = useState<number>(defaultTreadles - 2)
    const [maxTreadles, setMaxTreadles] = useState<number>(defaultTreadles + 2)

    useEffect(() => {
        console.log('fire')
        function filterList() {
            const newFilteredList = publicDrafts.filter((draft:PublicDraft)=>{
                const shafts=draft.weave.shafts.count||0
                const treadles=draft.weave.treadling.count||0
                console.log(shafts)
                console.log(treadles)
                if(shafts<minShafts || shafts>maxShafts)return
                if(treadles<minTreadles || treadles>maxTreadles)return
                
                console.log('yes, I m returning draft')
                return draft
    
            })
            console.log(newFilteredList)
           
    
            setFilteredDrafts(newFilteredList)
    
        }
        filterList()
    
        
    },[minShafts, maxShafts, minTreadles, maxTreadles, publicDrafts,setFilteredDrafts])

    function changeShaftsMinValue(e: React.ChangeEvent<HTMLInputElement>) {
        let newMin = Number(e.target.value)
        if (newMin > maxShafts) setMaxShafts(newMin)
        if (newMin > upperAccessoryGridLimit) newMin = lowerAccessoryGridLimit
        setMinShafts((prevValue) => { return newMin })
    }
    function changeShaftsMaxValue(e: React.ChangeEvent<HTMLInputElement>) {
        let newMax = Number(e.target.value)
        if (newMax < minShafts) setMinShafts(newMax)
        if (minShafts < lowerAccessoryGridLimit) setMinShafts(lowerAccessoryGridLimit)
        if (newMax > upperAccessoryGridLimit) newMax = upperAccessoryGridLimit
        setMaxShafts((prevValue) => { return newMax })
    }
    function changeTreadlesMinValue(e: React.ChangeEvent<HTMLInputElement>) {
        let newMin = Number(e.target.value)
        if (newMin > maxTreadles) setMaxTreadles(newMin)
        if (newMin > upperAccessoryGridLimit) newMin = lowerAccessoryGridLimit
        setMinTreadles((prevValue) => { return newMin })
    }
    function changeTreadlesMaxValue(e: React.ChangeEvent<HTMLInputElement>) {
        let newMax = Number(e.target.value)
        if (newMax < minTreadles) setMinTreadles(newMax)
        if (minTreadles < lowerAccessoryGridLimit) setMinTreadles(lowerAccessoryGridLimit)
        if (newMax > upperAccessoryGridLimit) newMax = upperAccessoryGridLimit
        setMaxTreadles((prevValue) => { return newMax })
        
    }


    return (
        <div className="filter-container">
            <form >
                <div className="form-row">
                    <h3>Shafts:</h3>
                    <div>
                        <div><label htmlFor="shaftsMinInput">Min</label></div>
                        <input type="number" name="shaftsMinInput" value={minShafts.toString()} onChange={(e) => { changeShaftsMinValue(e) }} min={lowerAccessoryGridLimit} max={upperAccessoryGridLimit} />
                    </div>
                    <div >
                        <div><label htmlFor="shaftsMaxInput">Max</label></div>
                        <input type="number" name="shaftsMaxInput" value={maxShafts.toString()} min={lowerAccessoryGridLimit} onChange={(e) => { changeShaftsMaxValue(e) }} max={upperAccessoryGridLimit} />
                    </div>
                    <div className='radio-box'>
                        order:
                        <label className="arrow" htmlFor="asc">	{'\u2191'}</label><input type="radio" name="treadleOrder" id="asc" />
                        <label className="arrow" htmlFor="desc">{'\u2193'}</label><input type="radio" name="treadleOrder" id="desc" />
                    </div>
                </div>
                <div className="form-row">
                    <h3>Treadles:</h3>
                    <div>
                        <div><label htmlFor="treadlesMinInput">Min</label></div>
                        <input type="number" name="treadlesMinInput" value={minTreadles.toString()} onChange={(e) => { changeTreadlesMinValue(e) }} min={lowerAccessoryGridLimit} max={upperAccessoryGridLimit} />
                    </div>
                    <div >
                        <div><label htmlFor="treadlesMaxInput">Max</label></div>
                        <input type="number" name="treadlesMaxInput" value={maxTreadles.toString()} min={lowerAccessoryGridLimit} onChange={(e) => { changeTreadlesMaxValue(e) }} max={upperAccessoryGridLimit} />
                    </div>
                    <div className='radio-box'>
                        <label>order:</label>
                        <label className="arrow" htmlFor="asc">	{'\u2191'}</label><input type="radio" name="treadleOrder" id="asc" />
                        <label className="arrow" htmlFor="desc">{'\u2193'}</label><input type="radio" name="treadleOrder" id="desc" />
                    </div>
                </div>

            </form>
        </div>
    )
}