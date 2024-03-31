'use client'
import './userdraftdisplay.scss'
import { useContext, useEffect, useState } from 'react'
import { DraftCard } from '@/app/components/(userpages)/profile/DraftCard'
import { UserContext } from '@/app/resources/contexts/usercontext'
import { UserContextType } from '@/app/resources/types/contexts'
import { DraftList } from '@/app/resources/types/dbdocuments'
//import { useAuth } from '@clerk/nextjs'


export function UserDraftDisplay() {
    //const [userId, setUserId]=useState()





    //const { userId } = useAuth()
    const [userDrafts, setUserDrafts] = useState<DraftList>([])



    async function collectUserWeaves() {
        //Collects all the users weaves fron db
        try {
            let response = await fetch(`/api/user_2dii9L385rba2mMqfGHkO39xFDU/drafts`)

            if (response.status == 200) {
                const body = await response.json();
                const { draftList } = body
                setUserDrafts(draftList)

            } else {

                throw new Error
            }

        } catch (error) {
            console.log(error)
            alert('Ops, please try anoyher one')
        }
    }

    //const { userDrafts } = useContext(UserContext) as UserContextType
    return (
        <>
            <button onClick={collectUserWeaves}>Collect Drafts</button>
            <div className='userdrafts'>

                {userDrafts.map(draft => {
                    if (!draft) return (null)
                    else {
                        return (<DraftCard key={draft._id} draft={draft} />)
                    }

                })}

            </div>
        </>
    )
}
