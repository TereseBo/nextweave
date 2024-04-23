
//This component is a card for presenting a loom and also contains the logic to update/delete it.
'use client'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'

import { EditReedForm } from './EditReedForm'
import { ReedImg } from './ReedImg'


export function ReedCard(params: { reed: Reed, closeForm:(()=>void)|null }) {
    const { reed, closeForm } = params

    return (

        <DisplayCard >

            <div className='vertical loom-card' >
                <ReedImg reed={reed}/>
                <EditReedForm reed={reed} closeForm={closeForm} />

            </div>

        </DisplayCard>

    )
}