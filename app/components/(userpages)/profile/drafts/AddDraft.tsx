'use client'
import './adddraft.scss'

import { useState } from 'react'

import { ColorPicker } from '@/app/components/draft/colorpicker/Colorpicker'
import { Draft } from '@/app/components/draft/draft/Draft'
import { DbSaveWeave } from '@/app/components/draft/draftoptions/dbhandler/DbSaveWeave'
import { SecondaryMenu } from '@/app/components/zSharedComponents/SecondaryMeny'

import { DisplayCard } from '../../DisplayCard'

export function AddDraft() {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);

    return (
        <>
            <div className={open ? 'buffer' : 'hidden'} onMouseLeave={closeForm}>
                <DisplayCard>
                    <div className='new-draft-container'>
                        <ColorPicker />
                        <Draft />
                        <SecondaryMenu>
                            <DbSaveWeave />
                        </SecondaryMenu>
                    </div>
                </DisplayCard>
            </div>
            <button onClick={openForm}>Create new draft</button>
        </>
    )
}