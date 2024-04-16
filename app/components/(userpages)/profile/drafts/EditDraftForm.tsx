//This component renders a draft which can de edited. It's visibility is toggled by props
'use client'
import './editdraftform.scss'

import { ColorPicker } from '@/app/components/draft/colorpicker/Colorpicker'
import { Draft } from '@/app/components/draft/draft/Draft'
import { StateDraft } from '@/app/components/draft/draft/StateDraft'

export function EditDraftForm(params: { resource: any, open: boolean }) {
//TODO:Move colorpixker style to relevant place
    return (
        <div className={params.open ? 'edit-draft-container' : 'hidden'}>
            <div className='edit-draft'>
                <StateDraft weaveObj={{ ...params.resource.weave }} />
            </div >
        </div>
    )

}