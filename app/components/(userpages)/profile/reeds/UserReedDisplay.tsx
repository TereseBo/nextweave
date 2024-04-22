//This component is a container for reedcards and represents the main content of the profile/looms
'use client'

import { ReedCard } from '@/app/components/(userpages)/profile/reeds/ReedCard'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function UserReedDisplay() {

    const { reeds } = useUserContext()

    return (
        <>
            {reeds? 
            <div className='card-list' id='user-reeds-list'>
                {reeds.map(reed => {
                    if (!reed) return (null)
                    else {
                        return (<ReedCard key={reed.id} reed={reed} closeForm={null} />)
                    }
                })}
            </div> : <div>Loading reeds</div>}


            {reeds&& reeds.length==0 ? 
            <div >
             You have no reeds to show.
            </div> : null}

        </>
    )
}