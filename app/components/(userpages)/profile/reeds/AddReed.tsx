//Component is a container for the card used to edit/delete/add loom to DB
'use client'

import { useState } from 'react'

import { templateReed} from '@/app/resources/constants/weaveDefaults'

import { ReedCard } from './ReedCard'

export function AddReed() {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);


    return (
        <>
            <div className={open ? 'buffer' : 'hidden'}>
                {/* TODO: ADD Hide/show of card */}
             <ReedCard reed={templateReed} closeForm={closeForm}/>
            </div>
            {open? <button onClick={closeForm}>Close card</button>:<button onClick={openForm}>Create reed</button>}
        </>
    )
}