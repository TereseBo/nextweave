//Component is a container for the card used to edit/delete/add loom to DB
'use client'
import './addloom.scss'

import { useState } from 'react'

import { defaultShafts, defaultTreadles, loomMakers,loomTypes} from '@/app/resources/constants/weaveDefaults'

import { LoomCard } from './LoomCard'

export function AddLoom() {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);
    const templateLoom: Loom = {
        id: undefined,
        shafts: defaultShafts,
        treadles: defaultTreadles,
        brand: loomMakers[0],
        type: loomTypes[0]
    }

    return (
        <>
            <div  className={open ? 'buffer' : 'hidden'} onMouseLeave={closeForm}>
             <LoomCard loom={templateLoom}/>
            </div>
            {open?  <button onClick={closeForm}>Close card</button>:<button onClick={openForm}>Create new loom</button>}
        </>
    )
}