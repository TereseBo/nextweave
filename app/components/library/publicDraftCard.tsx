'use client'

import { useRouter } from 'next/navigation'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'
import { useWeaveContext } from '@/app/resources/contexts/weavecontext'
import { readWeaveObject } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/readWeaveObject'
import { createWeave } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/writeDraftGrid'

import { PreviewGrid } from '../zSharedComponents/PreviewGrid'


export function PublicDraftCard(params: { draft: { weave: WeaveObject } }) {

    const { weave } = params.draft
    const gridSet= readWeaveObject(weave)
    const weaveGrid=createWeave(gridSet, 50,30)
    const { upSetGrids } = useWeaveContext()

    const router = useRouter()

    function useDraft() {
        if (weave) {
            upSetGrids(weave)
            router.push('/weaver/draft')
        } else {
            alert('Ops, something went wrong, please try another one')
        }
    }

    return (
        <div id='draft-card-container'>
            <DisplayCard >
                <div >
                    <div className='vertical draft-card' >
                        
                        <div className='draft-info-container'>
                                <button type='button' onClick={useDraft}>Use</button>
                        </div>
                        <PreviewGrid content={weaveGrid} type='publicDraft' />

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