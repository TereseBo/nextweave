'use client'
import './draftcard.scss'

import {useState} from 'react'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { DraftPreview } from '@/app/components/draft/draftoptions/dbhandler/DraftPreview'

//TODO:Add typing

export function DraftCard(params: { draft: any}) {
    const { draft } = params
    const [draftState, setDraftState]=useState(draft)

    function getResourceId(e:any){
        let fullIdentifier=e.target.id
        let id=fullIdentifier.split('-').slice(-1)[0]
        return id
    }

    async function editDraft(e:any){
        //TODO: Open in draft-editor 
        const id=getResourceId(e)
        const weaveObject=draftState.weave
        const body = { values: { weaveObject, public:false } }
        fetch(`/api/user_2dii9L385rba2mMqfGHkO39xFDU/draft/${id}`, {
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

    function deleteDraft(e:any){
        //TODO: Open in draft-editor 
        const id=getResourceId(e)


    }
    return (
        <DisplayCard >
            
            <div className='vertical draft-card' >
                
                    <DraftPreview weaveObj={draft?.weave} />
                    <div className='draft-info-container'>
                        <p> Treadles:<span>{draft?.weave.treadling?.count || '-'}</span></p>
                        <p>  Shafts:<span>{draft?.weave.shafts?.count || '-'}</span></p>
                        <p className='date'>  {draft?.updated}</p>
                        <div className='action-container'>
                            <button className='icon-button' id={`draft-${draft._id}`}onClick={(e)=>{editDraft(e)}}>Edit</button>
                            <button className='icon-button' id={`draft-${draft._id}`} onClick={(e)=>{deleteDraft(e)}}>Delete</button>

                        </div>
                    </div>
               
            </div>
        </DisplayCard>
    )
}