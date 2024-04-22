//This component is a card for presenting a loom and also contains the logic to update/delete it.
'use client'
import './loomcard.scss'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'

import { EditLoomForm } from './EditLoomForm'
import { LoomGrid } from './LoomGrid'

//TODO:Add typing

export function LoomCard(params: { loom: Loom, closeForm:(()=>void)|null }) {
    const { loom, closeForm } = params

    return (

        <DisplayCard >

            <div className='horizontal loom-card' >
                <LoomGrid treadles={loom.treadles} shafts={loom.shafts}/>
                <EditLoomForm loom={loom} closeForm={closeForm} />

            </div>

        </DisplayCard>

    )
}