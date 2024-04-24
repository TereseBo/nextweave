//Context handling information on the user and their resources
import { createContext, useContext, useEffect, useState } from 'react'

import { UserContextType } from '@/app/resources/types/contexts'

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
            getLooms(userId)
            getReeds(userId)
        }

        user ? getResources(user) : clearResources()

    }, [user])


    //Functions handling drafts:
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

        if (user && (!drafts.find(draft => { draft.id === _id }))) {
            getDrafts(user)
            return
        }
        const draftsCopy: DraftList = JSON.parse(JSON.stringify(drafts))
        const newDrafts: DraftList = draftsCopy.map(draft => {

            if (draft.id == _id) {

                let updatedDraft: Draft = JSON.parse(JSON.stringify(draft))
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
        const filteredCopy: DraftList = draftsCopy.filter((draft) => draft.id !== _id);
        setDrafts(filteredCopy)
    }

    //Functions handling looms:
    //Fetches all looms registered by a user
    async function getLooms(userId: string) {
        try {
            let response = await fetch(`/api/${userId}/looms`)

            if (response.status == 200) {
                const body = await response.json();
                const { loomList } = body
                setLooms(loomList)
            }
        } catch (error) {
            setLooms(null)
        }
    }

    //Accepts a loomId and a loom to replace the item in the loomList
    function updateLooms(id: string | undefined, updatedLoom: Loom): void {

        if (!looms) {
            return
        }

        if (user && (!id || !looms.find(loom => { loom.id === id }))) {
            getLooms(user)
            return
        }

        const loomsCopy: LoomList = JSON.parse(JSON.stringify(looms))
        const newLooms: LoomList = loomsCopy.map(loom => {

            if (loom.id == id) {

                let replacementLoom: any = JSON.parse(JSON.stringify(updatedLoom))
                replacementLoom.id = id
                return replacementLoom as Loom
            } else {
                return loom
            }
        })



        setLooms(newLooms)
    }

    //Removes a loom from loomList by Id
    function removeLoom(id: string): void {
        if (!looms) {
            return
        }
        const loomsCopy: LoomList = JSON.parse(JSON.stringify(looms))
        const filteredCopy: LoomList = loomsCopy.filter((loom) => loom.id !== id);
        setLooms(filteredCopy)
    }


    //Functions handling reeds:
    //Fetches all reeds registered by a user
    async function getReeds(userId: string) {

        try {
            let response = await fetch(`/api/${userId}/reeds`)

            if (response.status == 200) {
                const body = await response.json();
                const { reedList } = body
                setReeds(reedList)
            }
        } catch (error) {
            setReeds(null)
            console.log(error)
        }
    }

    //Accepts a reedId and a reed to replace the item in the reedList
    function updateReeds(id: string | undefined, updatedReed: Reed): void {

        if (!reeds) {
            return
        }
        if (user && (!id || !reeds.find(loom => { loom.id === id }))) {
            getReeds(user)
            return
        }
        const reedsCopy: ReedList = JSON.parse(JSON.stringify(looms))
        const newReeds: ReedList = reedsCopy.map(reed => {

            if (reed.id == id) {

                let replacementReed: any = JSON.parse(JSON.stringify(updatedReed))
                replacementReed.id = id
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

        <UserContext.Provider value={{ user, setUser, drafts, updateDraft, removeDraft, getDrafts, looms, updateLooms, removeLoom, reeds, updateReeds, removeReed }}>
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
}
