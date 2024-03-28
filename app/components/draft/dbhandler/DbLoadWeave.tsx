//Contains load button to collect from db

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import { DraftList } from '@/app/resources/types/dbdocuments'

import { DraftSelection } from '../draftoptions/DraftSelection'
//TODO:STYLE
export function DbLoadWeave() {

    const { userId } = useAuth()

    const [userDrafts, setUserDrafts] = useState<DraftList>([])
    const [visibleDraftList, setVisibleDraftList] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const openDraftList = () => setVisibleDraftList(true);
    const closeDraftList = () => setVisibleDraftList(false);

    async function collectUserWeaves() {
        //Collects all the users weaves fron db
        //setIsLoading(true)
        openDraftList()
        try {
            let response = await fetch(`/api/${userId}/drafts`)

            if (response.status == 200) {
                const body = await response.json();
                const { draftList } = body
                setUserDrafts(draftList)
                // setIsLoading(false)
            } else {
                //setIsLoading(false)
                throw new Error
            }

        } catch (error) {
            console.log(error)
            alert('Ops, please try anoyher one')
        }
    }

    return (
        <>


            {visibleDraftList ? <DraftSelection userDrafts={userDrafts} /> : null}
            {isLoading ? 'Loading drafts' : null}


            <button id="uploadButton" onClick={collectUserWeaves}>Load
            </button>
        </>
    )

}