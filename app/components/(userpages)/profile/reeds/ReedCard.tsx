
//This component is a card for presenting a loom and also contains the logic to update/delete it.
'use client'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'

import { EditReedForm } from './EditReedForm'

//TODO:Add typing

export function ReedCard(params: { reed: Reed }) {
    const { reed } = params

    return (

        <DisplayCard >

            <div className='horizontal loom-card' >
                <EditReedForm reed={reed} />

            </div>

        </DisplayCard>

    )
}