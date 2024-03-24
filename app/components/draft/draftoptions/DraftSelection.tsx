import { useContext, useEffect, useState } from 'react'

import { DraftPreview } from '@/app/components/draft/dbhandler/DraftPreview'
import { readWeaveObject } from '@/app/components/draft/filehandler/functions/set/readWeaveObject'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'
import { DraftList } from '@/app/resources/types/dbdocuments'

//TODO:STYLE 
export function DraftSelection(params: { userDrafts: DraftList }) {

    const { userDrafts } = params
    const { updateGrid } = useContext(WeaveContext) as WeaveContextType

    function loadDraft(e: React.ChangeEvent<HTMLInputElement>): void {
        const chosenDraftId = e.target.id

        const chosenDraft = userDrafts.find(draft => (draft?._id == chosenDraftId))
        const weaveObject = chosenDraft?.weave

        if (weaveObject) {
            upSetGrids(weaveObject)

        } else {
            throw new Error
        }
    }
    //TODO_Move to context
    function upSetGrids(weaveObj: WeaveObject): void {

        let newGrids = readWeaveObject(weaveObj)

        updateGrid('tieup', newGrids.tieupGrid)
        updateGrid('warp', newGrids.warpGrid)
        updateGrid('weft', newGrids.treadleGrid)
    }

    return (
        userDrafts.length > 0 ?
            <div id='draftcontainer'>
                {userDrafts.map(draft => {

                    if (!draft) return (<div key={Math.random()}>Hopsan</div>)
                    else {

                        return (<div key={draft._id} id={draft._id}>
                            <DraftPreview weaveObj={draft?.weave} />
                            <div>
                                <span>Treadles:</span>{draft?.weave.treadling?.count || '-'}
                                <span>Shafts:</span>{draft?.weave.shafts?.count || '-'}
                                <span>Modified:</span>{draft?.updated}
                            </div>
                        </div>)
                    }
                }
                )}
            </div> :
            <div>
                <div>No drafts found</div>
            </div>
    )

}