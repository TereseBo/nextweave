'use client'
import './draftcard.scss'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { DraftPreview } from '@/app/components/draft/draftoptions/dbhandler/DraftPreview'
import { ReformattedDraft } from '@/app/resources/types/dbdocuments'

export function DraftCard(params: { draft: any}) {
    const { draft } = params

    function editDraft(){
        //TODO: Open in draft-editor 
    }

    function deleteDraft(){
        //TODO: Open in draft-editor 
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
                            <button className='icon-button' id={`edit-${draft._id}`}onClick={editDraft}>Edit</button>
                            <button className='icon-button' id={`delete-${draft._id}`} onClick={deleteDraft}>Delete</button>

                        </div>
                    </div>
               
            </div>
        </DisplayCard>
    )
}