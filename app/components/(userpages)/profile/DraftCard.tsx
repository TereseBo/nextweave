//This component is a card for presenting a draft and also contains the logit to update/delete it.
'use client'
import './draftcard.scss'

import { useEffect, useRef, useState } from 'react'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { DraftPreview } from '@/app/components/draft/draftoptions/dbhandler/DraftPreview'

import { EditDraftForm } from '../EditDraftForm'
//TODO:Add typing
//TODO: Remove draft states and replace with accual drafts

export function DraftCard(params: { draft: any }) {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);
    const { draft } = params
    const [draftState, setDraftState] = useState(draft)
    const bottomRef = useRef<HTMLDivElement>(null);

    //Get the id of a draft
    function getResourceId(e: any) {
        let fullIdentifier = e.target.id
        let id = fullIdentifier.split('-').slice(-1)[0]
        return id
    }

    //TODO: replace user with acctual id
    async function editDraft(e: any) {
        const id = getResourceId(e)
        const weaveObject = draftState.weave
        const body = { values: { weaveObject, public: false } }
        fetch(`/api/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {
            console.log(response)
            if (response.status == 200) {
                alert('Draft updated!')
            } else {
                alert('Ops, the draft could not be updated')
            }
        })
    }

    function deleteDraft(e: any) {
        //TODO: Add functionality
        const id = getResourceId(e)
    }

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
                                {open ? <><button type='button' onClick={(e) => { editDraft(e) }}>Save</button> <button type='button' onClick={closeForm}>Close</button></> : <button type='button' onClick={openForm}>Edit</button>}
                                <button className='icon-button' id={`draft-${draft._id}`} onClick={(e) => { deleteDraft(e) }}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </DisplayCard>
            <div className={open ? 'spacer' : ''} ref={bottomRef} />
        </div>
    )
}