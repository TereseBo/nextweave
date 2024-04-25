import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import { useWeaveContext } from '@/app/resources/contexts/weavecontext'
import { createWeaveObject } from '@/app/resources/functions/weaveObjHandling/createWeaveObj/createWeaveObject'

export function Downloadweave() {
    const { treadleGrid, tieUpGrid, warpGrid } = useWeaveContext()
    const [weaveJSON, setWeaveJSON] = useState('')
    useEffect(() => {
        if (warpGrid && treadleGrid && tieUpGrid) {
            const weave = createWeaveObject(warpGrid, treadleGrid, tieUpGrid)
            const weaveJson = JSON.stringify(weave)
            setWeaveJSON(weaveJson)
        }
    }, [warpGrid, treadleGrid, tieUpGrid])


    return (


        <Link href={'data:application/json;charset=utf-8,' + encodeURIComponent(weaveJSON)} download='weave' target="_blank">Download</Link>

    )

}