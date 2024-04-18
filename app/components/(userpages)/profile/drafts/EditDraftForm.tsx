//This component renders a draft which can de edited. It's visibility is toggled by props
'use client'
import './editdraftform.scss'

import { useState } from 'react'

import { StateDraft } from '@/app/components/draft/draft/StateDraft'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function EditDraftForm(params: { resource: any, open: boolean }) {

    const { open, resource } = params
    const draftId = resource._id
    const { user } = useUserContext()
    //TODO:Move colorpixker style to relevant place

    const [updatedWeaveObj, setUpdatedWeaveObj] = useState<WeaveObject>(JSON.parse(JSON.stringify({ ...resource.weave })))
    const updateObj = (neObj: WeaveObject) => { setUpdatedWeaveObj(neObj) }

    //TODO: replace user with acctual id
    async function editDraft(e: any) {

        const weaveObject = updatedWeaveObj
        //TODO: Add components to toggle public status
        const body = { values: { weaveObject, public: false } }
        fetch(`/api/${user}/draft/${draftId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 200) {
                //TODO:Update draft in usderContext to match
                alert('Draft updated!')
            } else {
                alert('Ops, the draft could not be updated')
            }
        })
    }

    function deleteDraft(e: any) {

        fetch(`/api/${user}/draft/${draftId}`, { method: 'DELETE' })
        .then(function (response) {

            if (response.status == 200) {
                //TODO:Update draft in usderContext to match
                alert('Draft deleted!')
            } else {
                alert('Ops, could not delete the draft')
            }
        })
    }

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