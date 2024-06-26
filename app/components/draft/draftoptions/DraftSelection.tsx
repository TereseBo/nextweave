//This component renders a list of drafts from the DB, including a generated preview.
import './draftselection.scss' //The styling is heavy on this component in order to render as desired

import { useWeaveContext } from '@/app/resources/contexts/weavecontext'

import { DraftPreview } from '../../zSharedComponents/DraftPreview'

export function DraftSelection(params: { userDrafts: DraftList, setVisibility: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { userDrafts, setVisibility } = params
    const { upSetGrids } = useWeaveContext()

    //Click on a draft in the preview list updates the draft displayed in the draftpage 
    function loadDraft(e: React.MouseEvent<HTMLElement>): void {
        const chosenDraftId = e.currentTarget.id

        const chosenDraft = userDrafts.find(draft => (draft?.id == chosenDraftId))
        const weaveObject = chosenDraft?.weave

        if (weaveObject) {
            upSetGrids(weaveObject)

        } else {
            alert('Ops, something went wrong, please try another one')
        }
    }

    //Closes the draftlist, opening the list is handled by parent
    const closeList = () => setVisibility(false);

    return (
        <div id='draftselection-container-container' >
            {userDrafts.length > 0 ?
                <div className='spacer' onMouseLeave={closeList}>
                    <div id='draftselection-container' >
                        {userDrafts.map(draft => {

                            if (!draft) return (<div key={Math.random()}>Could not load draft</div>)
                            else {
                                return (
                                    <div key={draft.id} id={draft.id} className='draft-select-option' onClick={loadDraft}>
                                        <div className='bob'>
                                            <DraftPreview weaveObj={draft?.weave} x={10} y={10} />
                                            <div className='draft-info-container'>
                                                <p> Treadles:<span>{draft.weave.treadling?.count || '-'}</span></p>
                                                <p>  Shafts:<span>{draft.weave.shafts?.count || '-'}</span></p>
                                                <p className='date'>  {draft.updateDate}</p>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        }
                        )}
                    </div>
                </div> :
                <div>
                    <div>No drafts found</div>
                </div>}
        </div>
    )
}