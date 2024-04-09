'use client'
import './userdraftdisplay.scss'

import { useContext,useState } from 'react'

import { DraftCard } from '@/app/components/(userpages)/profile/drafts/DraftCard'
import { UserContext } from '@/app/resources/contexts/usercontext'
import { UserContextType } from '@/app/resources/types/contexts'
import { DraftList } from '@/app/resources/types/dbdocuments'

export function UserDraftDisplay() {

    const [userDrafts, setUserDrafts] = useState<DraftList>([])

    //TODO: extract relevant from context in separate step
    const { drafts } = useContext(UserContext) as UserContextType

    return (
        <>

            {drafts ? 
            <div className='userdrafts'>
                {drafts.map(draft => {
                    if (!draft) return (null)
                    else {
                        return (<DraftCard key={draft._id} draft={draft} />)
                    }

                })}
            </div> : <div>Loading drafts</div>}

            
            {drafts && drafts.length==0 ? 
            <div className='userdrafts'>
             Card to create a draft
            </div> : null}


        </>
    )
}
