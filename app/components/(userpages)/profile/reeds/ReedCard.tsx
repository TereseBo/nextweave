
//This component is a card for presenting a loom and also contains the logic to update/delete it.
'use client'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'

import { EditReedForm } from './EditReedForm'


export function ReedCard(params: { reed: Reed, closeForm:(()=>void)|null }) {
    const { reed, closeForm } = params

    return (

        <DisplayCard >

            <div className='horizontal loom-card' >
                <EditReedForm reed={reed} closeForm={closeForm} />

            </div>

        </DisplayCard>

    )
}