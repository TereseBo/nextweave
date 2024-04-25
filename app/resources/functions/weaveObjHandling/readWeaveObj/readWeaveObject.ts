import { defaultDraftHeight, defaultDraftWidth, defaultShafts, defaultTreadles } from '@/app/resources/constants/weaveDefaults'
import { createGrid } from '@/app/resources/functions/gridHandling/createGrid'

import { readTieup } from './readTieup'
import { readWarp } from './readWarp'
import { readWeft } from './readWeft'

export function readWeaveObject(weaveObject: WeaveObject) {
    let shafts = weaveObject.shafts.count || defaultShafts
    let treadles = weaveObject.treadling.count || defaultTreadles
    let width = Math.max(weaveObject.shafts.pattern.length, defaultDraftWidth)
    let height = Math.max(weaveObject.treadling.pattern.length, defaultDraftHeight)

    let tieUpGrid: grid = createGrid(treadles, shafts)
    tieUpGrid = readTieup(tieUpGrid, weaveObject.tieup)
    let treadleGrid: grid = readWeft(weaveObject.treadling, height)
    let warpGrid: grid = readWarp(weaveObject.shafts, width)


    return { warpGrid, tieUpGrid, treadleGrid }

}
