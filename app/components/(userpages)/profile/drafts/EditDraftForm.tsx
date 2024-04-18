//This component renders a draft which can de edited. It's visibility is toggled by props
'use client'
import './editdraftform.scss'

import { useState } from 'react'

import { StateDraft } from '@/app/components/draft/draft/StateDraft'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function EditDraftForm(params: { resource: any, open: boolean, closeForm: () => void }) {
    
    const { open, resource, closeForm } = params
    const draftId = resource._id
    const { user, updateDraft, removeDraft } = useUserContext()
    //TODO:Move colorpixker style to relevant place

    const [updatedWeaveObj, setUpdatedWeaveObj] = useState<WeaveObject>(JSON.parse(JSON.stringify({ ...resource.weave })))
    const updateObj = (neObj: WeaveObject) => { setUpdatedWeaveObj(neObj) }

    //Submitts edition to DB and updates draftList in context
    async function editDraft(e: any) {

        //TODO: Add components to toggle public status
        const body = { values: { weaveObject: updatedWeaveObj, public: false } }
        fetch(`/api/${user}/draft/${draftId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 200) {
                //TODO:Update draft in usderContext to match
                updateDraft(draftId, { weave: updatedWeaveObj, public: false })
                alert('Draft updated!')
                closeForm()
            } else {
                alert('Ops, the draft could not be updated')
            }
        })
    }

    //Deletes draft from DB and updates draftlist in context
    function deleteDraft(e: any) {

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
    //TODO:Fix broken styling of buttons
    return (
        <div className={open ? 'edit-draft-container' : 'hidden'}>
            <div className='edit-draft'>
                <StateDraft weaveObj={{ ...params.resource.weave }} updateObj={updateObj} />
            </div >
            <div className='action-container'>
                <><button type='button' onClick={(e) => { editDraft(e) }}>Save</button> <button className='icon-button' id={`draft-${draftId}`} onClick={(e) => { deleteDraft(e) }}>Delete</button></>
            </div>
        </div>
    )

}