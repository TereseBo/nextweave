//This component is a card for presenting a draft and also contains the logit to update/delete it.
'use client'
import './draftcard.scss'

import { useEffect, useRef, useState } from 'react'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { DraftPreview } from '@/app/components/draft/draftoptions/dbhandler/DraftPreview'
import { useUserContext } from '@/app/resources/contexts/usercontext'

import { EditDraftForm } from './EditDraftForm'
//TODO:Add typing
//TODO: Remove draft states and replace with accual drafts

export function DraftCard(params: { draft: any }) {

    const { weave}= params.draft
    const draftId=params.draft._id
    const { user } = useUserContext()
    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);
    const { draft } = params
    const [updatedWeaveObj, setUpdatedWeaveObj] = useState<WeaveObject>({ ...weave })
    const bottomRef = useRef<HTMLDivElement>(null);
    const setNewWeaveObj=(obj:WeaveObject)=>setUpdatedWeaveObj(obj)




    

    //Use effect scrolls to bottom of card and then some when it's size is changed due to open/close of the drafteditor
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current?.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    },
        [open])

    return (
        <div id='draft-card-container'>
            <DisplayCard >
                <div >
                    <div className='vertical draft-card' >

                        {open ? <EditDraftForm open={open} resource={draft} /> : <DraftPreview weaveObj={draft?.weave} />}
                        <div className='draft-info-container'>
                            <p> Treadles:<span>{draft?.weave.treadling?.count || '-'}</span></p>
                            <p>  Shafts:<span>{draft?.weave.shafts?.count || '-'}</span></p>
                            <p className='date'>  {draft?.updated}</p>
                            <div className='action-container'>
                                {open ? <><button type='button' onClick={closeForm}>Close</button></> : <button type='button' onClick={openForm}>Edit</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </DisplayCard>
            <div className={open ? 'spacer' : ''} ref={bottomRef} />
        </div>
    )
}