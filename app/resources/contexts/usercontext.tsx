//Context handling information on the user and their resources
import { createContext, useContext, useEffect, useState } from 'react'

import { UserContextType } from '@/app/resources/types/contexts'

import { DraftList, LoomList,  ReformattedDraft } from '../types/dbdocuments'

export const UserContext = createContext<UserContextType | null>(null)
export function UserProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {

    const [user, setUser] = useState<string | null>(null)
    const [drafts, setDrafts] = useState<DraftList | null>(null)
    const [looms, setLooms] = useState<LoomList | null>(null)
    const [reeds, setReeds] = useState<ReedList | null>(null)

    useEffect(() => {
        function clearResources() {
            setDrafts(null)
            setLooms(null)
            setReeds(null)
        }

        function getResources(userId: string) {
            getDrafts(userId)
            getReeds(userId)
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

        //Functions handling reeds:
    //Fetches all reeds registered by a user
    async function getReeds(userId: string) {
        try {
            let response = await fetch(`/api/${userId}/reeds`)

            if (response.status == 200) {
                const body = await response.json();
                const { reedList } = body
                setLooms(reedList)
            }
        } catch (error) {
            setLooms(null)
        }
    }

    //Accepts a reedId and a reed to replace the item in the reedList
    function updateReed(id: string, updatedReed: Reed): void {

        if (!reeds) {
            return
        }
        const reedsCopy: ReedList = JSON.parse(JSON.stringify(looms))
        const newReeds: ReedList = reedsCopy.map(reed => {

            if (reed.id == id) {
                console.log('id:s matched')
                let replacementReed:any = JSON.parse(JSON.stringify(updatedReed))
                replacementReed.id=id
                return replacementReed as Reed
            } else {
                return reed
            }
        })

        setReeds(newReeds)
    }

    //Removes a reed from reedList by Id
    function removeReed(id: string): void {
        if (!reeds) {
            return
        }
        const reedsCopy: ReedList = JSON.parse(JSON.stringify(reeds))
        const filteredCopy: ReedList = reedsCopy.filter((reed) => reed.id !== id);
        setReeds(filteredCopy)
    }

    return (

        <UserContext.Provider value={{ user, setUser, drafts, updateDraft, removeDraft, reeds, updateReed, removeReed }}>
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
