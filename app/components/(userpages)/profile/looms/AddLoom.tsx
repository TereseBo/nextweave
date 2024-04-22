//Component is a container for the card used to edit/delete/add loom to DB
'use client'
import './addloom.scss'

import { useState } from 'react'

import {  templateLoom} from '@/app/resources/constants/weaveDefaults'

import { LoomCard } from './LoomCard'

export function AddLoom() {

    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);


    return (
        <>
            <div  className={open ? 'buffer' : 'hidden'} >
             <LoomCard loom={templateLoom} closeForm={closeForm}/>
            </div>
            {open?  <button onClick={closeForm}>Close card</button>:<button onClick={openForm}>Create new loom</button>}
        </>
    )
}