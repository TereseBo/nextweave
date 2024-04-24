//This component is a container for draftcards and represents the main content of the profile/drafts
'use client'

import { DraftCard } from '@/app/components/(userpages)/profile/drafts/DraftCard'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function UserDraftDisplay() {

    const { drafts } = useUserContext()

    return (
        <>
            {drafts ?
                <div className='card-list'>
                    {drafts.map(draft => {
                        if (!draft) return (null)
                        else {
                            return (<DraftCard key={draft.id} draft={draft} />)
                        }
                    })}
                </div> : <div>Loading drafts</div>}


            {drafts && drafts.length == 0 ?
                <div >
                    You have no drafts to show.
                </div> : null}
        </>
    )
}
