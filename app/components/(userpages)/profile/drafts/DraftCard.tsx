//This component is a card for presenting a draft and also contains the logit to update/delete it.
'use client'
import './draftcard.scss'

import { useEffect, useRef, useState } from 'react'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { ReplaceDraftButton } from '@/app/components/library/replaceDraftButton'
import { DraftPreview } from '@/app/components/zSharedComponents/DraftPreview'

import { EditDraftForm } from './EditDraftForm'

export function DraftCard(params: { draft: Draft }) {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);
    const { draft } = params
    const bottomRef = useRef<HTMLDivElement>(null);  

    //TODO: Fix scroll
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
    },[open])

    return (
        <div id='draft-card-container'>
            <DisplayCard >
                <div >
                    <div className='vertical draft-card' >

                        {open ? <EditDraftForm open={open} resource={draft} closeForm={closeForm}/> : <DraftPreview weaveObj={draft.weave} x={10} y={10} />}
                        <div className='draft-info-container'>
                            <p> Treadles:<span>{draft.weave.treadling?.count || '-'}</span></p>
                            <p>  Shafts:<span>{draft.weave.shafts?.count || '-'}</span></p>
                            <p className='date'>  {draft.updateDate}</p>
                            <div className='action-container'>
                                {open ? <><button type='button' onClick={closeForm}>Close</button></> : <><ReplaceDraftButton weave={draft.weave}/><button type='button' onClick={openForm}>Edit</button></>}
                            </div>
                        </div>
                    </div>
                </div>
            </DisplayCard>
            <div className={open ? 'spacer' : ''} ref={bottomRef} />
        </div>
    )
}