'use client'
import './editdraftform.scss'

import {useState} from 'react'

import { ColorPicker } from '@/app/components/draft/colorpicker/Colorpicker'
import { Draft } from '@/app/components/draft/draft/Draft'

import { DraftHeader } from './DraftHeader'
export function EditDraftForm(params:{resource:any}){

    //const [thing, setThing]=useState(params.resource)
return(
    <div className='edit-draft-container'>
    <div className='edit-draft'>
    <ColorPicker />
    <DraftHeader text={`You are now editing draft ${'hrj'}`}/>
    <Draft />
    </div>
    </div>
)

}