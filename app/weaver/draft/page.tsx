//Page containing the point and click draft and it's associated forms
'use client'
import './draftpage.scss'

import { ColorPicker } from '@/app/components/draft/colorpicker/Colorpicker'
import { Draft } from '@/app/components/draft/draft/Draft'
import { ProjectOptions } from '@/app/components/draft/ProjectOptions'
import { Header } from '@/app/components/zSharedComponents/Header'

export default function DraftPage() {

    return (
        <div id='draft-page'>
            <Header title="Welcome to the draft creator!" text="Choose a color and click to fill in warp and treadling"></Header>
                <ColorPicker />
                <Draft />
                <ProjectOptions/>
        </div>
    )
}