//Context handling information on the user and their resources
import { createContext, useContext, useEffect, useState } from 'react'

import { UserContextType } from '@/app/resources/types/contexts'

import { DraftList, LoomList, ReedList, ReformattedDraft } from '../types/dbdocuments'

export const UserContext = createContext<UserContextType | null>(null)
export function UserProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {

    const [user, setUser] = useState<string | null>(null)
    const [drafts, setDrafts] = useState<DraftList | null>(null)
    const [looms, setLooms] = useState<LoomList | null>(null)
    const [reeds, setReeds] = useState<ReedList | null>(null)

    useEffect(() => {
        function clearResources() {
            setDrafts(null)
            //setLooms(null)
            //setReeds(null)
        }

        function getResources(userId: string) {
            getDrafts(userId)
        }

        user ? getResources(user) : clearResources()

    }, [user])



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

    //Accepts a draftId and and updated weave to replace the weave in the draftlist
    function updateDraft(_id: string, weave: WeaveObject): void {

        if (!drafts) {
            return
        }
        const draftsCopy: DraftList = JSON.parse(JSON.stringify(drafts))
        const newDrafts: DraftList = draftsCopy.map(draft => {

            if (draft._id == _id) {
                console.log('id:s matched')
                let updatedDraft: ReformattedDraft = JSON.parse(JSON.stringify(draft))
                let copiedUpdate: WeaveObject = JSON.parse(JSON.stringify(weave))
                updatedDraft = Object.assign(updatedDraft, copiedUpdate)
                return updatedDraft
            } else {
                return draft
            }
        })

        setDrafts(newDrafts)
    }

    function removeDraft(_id: string): void {
        if (!drafts) {
            return
        }
        const draftsCopy: DraftList = JSON.parse(JSON.stringify(drafts))
        const filteredCopy: DraftList = draftsCopy.filter((draft) => draft._id !== _id);
        setDrafts(filteredCopy)
    }

    return (

        <UserContext.Provider value={{ user, setUser, drafts, updateDraft, removeDraft }}>
            {children}
        </UserContext.Provider>
    )
}

//Hook to use the usercontext
export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('Usercontext must be used inside the userpages');
    }

    return context;
};
