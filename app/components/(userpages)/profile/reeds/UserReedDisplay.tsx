//This component is a container for reedcards and represents the main content of the profile/looms
'use client'
import './userloomdisplay.scss'

import { ReedCard } from '@/app/components/(userpages)/profile/reeds/ReedCard'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function UserReedDisplay() {

    const { reeds } = useUserContext()

    return (
        <>
            {reeds? 
            <div className='userdrafts'>
                {reeds.map(reed => {
                    if (!reed) return (null)
                    else {
                        return (<ReedCard key={reed.id} reed={reed} />)
                    }
                })}
            </div> : <div>Loading looms</div>}


            {reeds&& reeds.length==0 ? 
            <div >
             You have no reeds to show.
            </div> : null}

        </>
    )
}