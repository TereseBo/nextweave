
import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'

import { DraftPreview } from '../zSharedComponents/DraftPreview'
import { ReplaceDraftButton } from './replaceDraftButton'

export function PublicDraftCard(params: { draft: { weave: WeaveObject } }) {

    const { weave } = params.draft
    
    return (
        <div id='draft-card-container'>
            <DisplayCard >
                <div >
                    <div className='vertical draft-card' >

                        <div className='draft-info-container'>
                            <ReplaceDraftButton weave={weave} />
                        </div>
                        <DraftPreview weaveObj={weave} x={25} y={25} />

                        <div className='draft-info-container'>
                            <p> Treadles:<span>{weave.treadling?.count || '-'}</span></p>
                            <p>  Shafts:<span>{weave.shafts?.count || '-'}</span></p>
                        </div>
                    </div>
                </div>
            </DisplayCard>

        </div>
    )

}