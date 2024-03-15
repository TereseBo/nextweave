import { collectTieup } from './collectTieup'
import { collectWarp } from './collectWarp'
import { collectWeft } from './collectWeft'

export function createWeaveObject(warpGrid: grid, weftGrid: grid, tieupGrid: grid) {
    const shafts = collectWarp(warpGrid)
    const treadling = collectWeft(weftGrid)
    const tieup = collectTieup(tieupGrid)

    const weave = {
        shafts,
        treadling,
        tieup,
        threads: null
    }

    return weave

}