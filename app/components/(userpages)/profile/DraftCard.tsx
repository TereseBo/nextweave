'use client'
import './draftcard.scss'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { DraftPreview } from '@/app/components/draft/draftoptions/dbhandler/DraftPreview'
import { ReformattedDraft } from '@/app/resources/types/dbdocuments'

export function DraftCard(params: { draft: any}) {
    const { draft } = params
    return (
        <DisplayCard >
            
            <div className='horizontal' >
                <div className='bob'>
                    <DraftPreview weaveObj={draft?.weave} />
                    <div className='draft-info-container'>
                        <p> Treadles:<span>{draft?.weave.treadling?.count || '-'}</span></p>
                        <p>  Shafts:<span>{draft?.weave.shafts?.count || '-'}</span></p>
                        <p className='date'>  {draft?.updated}</p>
                    </div>
                </div>
            </div>
        </DisplayCard>
    )
}