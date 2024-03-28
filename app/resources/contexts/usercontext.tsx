//Context handling information and calculations between different parts (aka treadles, shafts, tieups) of the draft and calculates the weave.
//dependencies
import { createContext, useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import { DraftList, LoomList, ReedList } from '../types/dbdocuments'

export const UserContext = createContext<UserContextType | null>(null)
export function UserProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {

    const [user, setUser] = useState(useAuth())
    const [drafts, setDrafts] = useState<DraftList | null>(null)
    const [looms, setLooms] = useState<LoomList | null>(null)
    const [reeds, setReeds] = useState<ReedList | null>(null)

    useEffect(() => {
        if (user.userId) {
            getDrafts(user.userId)
        }

    }, [user.userId])

    async function getDrafts(userId: string) {
        try {
            let response = await fetch(`/api/${userId}/drafts`)

            if (response.status == 200) {
                const body = await response.json();
                const { draftList } = body
                setDrafts(draftList)
            }
        } catch (error) {
            setDrafts(null)
        }
    }

    return (

        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}

