'use client'
import './adddraft.scss'

import { useState } from 'react'

import { ColorPicker } from '@/app/components/draft/colorpicker/Colorpicker'
import { Draft } from '@/app/components/draft/draft/Draft'
import { DbSaveWeave } from '@/app/components/draft/draftoptions/dbhandler/DbSaveWeave'
import { SecondaryMenu } from '@/app/components/zSharedComponents/SecondaryMeny'
import { useUserContext } from '@/app/resources/contexts/usercontext'
import { useWeaveContext } from '@/app/resources/contexts/weavecontext'

import { DisplayCard } from '../../DisplayCard'

export function AddDraft() {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    const { user, getDrafts } = useUserContext()
    const { emptyGrids } = useWeaveContext()
    const syncDrafts = () => {
        if (user) { getDrafts(user) }
        closeForm()
        emptyGrids()
    }


    return (
        <>
            <div className={open ? 'buffer' : 'hidden'} >
                <DisplayCard>
                    <div className='new-draft-container'>
                        <ColorPicker />
                        <Draft />
                        <SecondaryMenu>
                            <DbSaveWeave afterSave={syncDrafts} />
                            <button onClick={closeForm}>Close</button>
                        </SecondaryMenu>
                    </div>
                </DisplayCard>
            </div>
            <button onClick={openForm}>Create new draft</button>
        </>
    )
}