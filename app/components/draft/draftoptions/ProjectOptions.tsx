//Contains logic for optional additions to draftpage,mainly intended for use when planning a weaving project and printing the draft
import './ProjectOptions.scss'

import { useState } from 'react'
import { useContext, useEffect, useRef } from 'react'
import { useAuth, } from '@clerk/nextjs'

import { Warpwidthform } from '@/app/components/calculator/Warpwidthform'
import { DbOptions } from '@/app/components/draft/draftoptions/DbOptions'
import { FileOptions } from '@/app/components/draft/draftoptions/FileOptions'
import { Yarnlist } from '@/app/components/draft/forms/Yarnlist'
import { SecondaryMenu } from '@/app/components/zSharedComponents/SecondaryMeny'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'
import { toggleBool } from '@/app/resources/functions/toggleBool'

export function ProjectOptions() {
    //State controls if yarnlist and warpeidth form are to be seen in the draftpage
    const [displayYarn, setDisplayYarn] = useState(false)
    const [displayWarp, setDisplayWarp] = useState(false)

    const { weftColors, warpColors } = useContext(WeaveContext) as WeaveContextType

    const bottomRef = useRef<HTMLDivElement>(null);

    //The options for save/load depends on if user is logged in
    const { isSignedIn } = useAuth();

    //Use effect keeps page scrolled to the bottom on changes in content of the project options
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current?.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    },
        [displayWarp, displayYarn])

    function yarnClickhandler(): void {
        setDisplayYarn(toggleBool(displayYarn))
        window.scrollTo(0, document.body.scrollHeight)
    }
    function warpClickhandler(): void {
        setDisplayWarp(toggleBool(displayWarp))
        window.scrollTo(0, document.body.scrollHeight)
    }
    return (
        <div>
            <SecondaryMenu>
                {displayYarn ? <button onClick={yarnClickhandler}>Hide yarn list</button> : <button onClick={yarnClickhandler}>Add yarn list</button>}
                {displayWarp ? <button onClick={warpClickhandler}>Hide warp info</button> : <button onClick={warpClickhandler}>Add warp info</button>}
            
                {/* Save options */}
                {isSignedIn ? <DbOptions /> : <FileOptions />}

            </SecondaryMenu>
            <div className='optional-content'>
                {displayYarn ? <Yarnlist content={warpColors} heading={'Warp'} /> : null}
                {displayYarn ? <Yarnlist content={weftColors} heading={'Weft'} /> : null}
                {displayWarp ? <Warpwidthform /> : null}
            </div>
            <div ref={bottomRef} />
        </div>
    )
}