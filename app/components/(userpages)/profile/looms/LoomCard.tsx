//This component is a card for presenting a loom and also contains the logic to update/delete it.
'use client'
import './loomcard.scss'

import { useEffect, useRef, useState } from 'react'

import { DisplayCard } from '@/app/components/(userpages)/DisplayCard'

import { EditLoomForm } from './EditLoomForm'

//TODO:Add typing

export function LoomCard(params: { loom: Loom }) {
    const { loom } = params

    return (

        <DisplayCard >

            <div className='horizontal loom-card' >
                <EditLoomForm loom={loom} />

            </div>

        </DisplayCard>

    )
}