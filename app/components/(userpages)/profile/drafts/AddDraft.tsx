'use client'
import './adddraft.scss'

import { useState} from 'react'

import { DbSaveWeave } from '@/app/components/draft/draftoptions/dbhandler/DbSaveWeave'
import { SecondaryMenu } from '@/app/components/zSharedComponents/SecondaryMeny'

import { EditDraftForm } from './EditDraftForm'

export function AddDraft() {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    return (
        <>
            <div className={open ? 'new-draft-container' : 'hidden'} onMouseLeave={closeForm}>
                <EditDraftForm open={true} resource={'none'} closeForm={closeForm}/>
                <SecondaryMenu>
                    <DbSaveWeave />
                </SecondaryMenu>
            </div>
            <button onClick={openForm}>Create new draft</button>
        </>
    )
}