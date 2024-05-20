//This component renders a draft which can de edited. It's visibility is toggled by props
'use client'
import './editdraftform.scss'

import { useState } from 'react'

import { StateDraft } from '@/app/components/draft/draft/StateDraft'
import { ReplaceDraftButton } from '@/app/components/library/replaceDraftButton'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function EditDraftForm(params: { resource: Draft, open: boolean, closeForm: () => void, publicStatus:boolean }) {

    const { open, resource, closeForm, publicStatus } = params
    const draftId = resource.id
    const { user, updateDraft, removeDraft } = useUserContext()
    //TODO:Move colorpixker style to relevant place

    const [updatedWeaveObj, setUpdatedWeaveObj] = useState<WeaveObject>(JSON.parse(JSON.stringify({ ...resource.weave })))
    const [updatedPublicStatus, setUpdatedPublicStatus]=useState<boolean>(publicStatus)
    const updateObj = (neObj: WeaveObject) => { setUpdatedWeaveObj(neObj) }

    //Submitts edition to DB and updates draftList in context
    async function editDraft(e:  React.MouseEvent<HTMLElement>) {
        if (draftId === undefined) {
            return
        }

        //TODO: Add components to toggle public status
        const body = { values: { weaveObject: updatedWeaveObj,  publicStatus: updatedPublicStatus  } }
        fetch(`/api/${user}/draft/${draftId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 200) {
                //TODO:Update draft in usderContext to match
                updateDraft(draftId, { weave: updatedWeaveObj, publicStatus: updatedPublicStatus })
                alert('Draft updated!')
                closeForm()
            } else {
                alert('Ops, the draft could not be updated')
            }
        })
    }

    //Deletes draft from DB and updates draftlist in context
    function deleteDraft(e:  React.MouseEvent<HTMLElement>) {
        if (draftId === undefined) {
            return
        }

        fetch(`/api/${user}/draft/${draftId}`, { method: 'DELETE' })
            .then(function (response) {

                if (response.status == 200) {
                    //TODO:Update draft in usderContext to match
                    removeDraft(draftId)
                    alert('Draft deleted!')
                    closeForm()
                } else {
                    alert('Ops, could not delete the draft')
                }
            })
    }

    function editStatus(e: React.ChangeEvent<HTMLInputElement> ){
        
        setUpdatedPublicStatus(e.target.checked)

    }
    //TODO:Fix broken styling of buttons
    return (
        <div className={open ? 'edit-draft-container' : 'hidden'}>
            <div className='edit-draft'>
                <StateDraft weaveObj={{ ...params.resource.weave }} updateObj={updateObj} />
            </div >
            <div className='action-container'>
                <><button type='button' onClick={(e) => { editDraft(e) }}>Save</button> <button className='icon-button' id={`draft-${draftId}`} onClick={(e) => { deleteDraft(e) }}>Delete</button><ReplaceDraftButton weave={resource.weave}/></>
            </div>
            {open ? <div>  Public:<span>{<label className="switch" ><input type="checkbox" checked={updatedPublicStatus} onChange={(e) => { editStatus(e) }}/><span className="slider"></span></label>}</span></div> : null}
        </div>
    )

}