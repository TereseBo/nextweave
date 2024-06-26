//This component is a container for loomcards and represents the main content of the profile/looms
'use client'

import { LoomCard } from '@/app/components/(userpages)/profile/looms/LoomCard'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function UserLoomDisplay() {

    const { looms } = useUserContext()

    return (
        <>
            {looms ? 
            <div className='card-list' id='user-looms-list'>
                {looms.map(loom => {
                    if (!loom) return (null)
                    else {
                        return (<LoomCard key={loom.id} loom={loom} closeForm={null}/>)
                    }
                })}
            </div> : <div>Loading looms</div>}

            
            {looms && looms.length==0 ? 
            <div >
             You have no looms to show.
            </div> : null}

        </>
    )
}
