'use client'
import { useContext } from 'react'
import { DraftCard } from '@/app/components/(userpages)/profile/DraftCard'
import { UserContext } from '@/app/resources/contexts/usercontext'
import { UserContextType } from '@/app/resources/types/contexts'



export function UserDraftDisplay() {

    const { userDrafts } = useContext(UserContext) as UserContextType
    return (
        <div>
            {userDrafts.map(draft => {
                if (!draft) return (null)
                else {
                    return (<DraftCard draft={draft} />)
                }

            })}

        </div>
    )
}
