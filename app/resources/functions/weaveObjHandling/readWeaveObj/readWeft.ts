import { defaultDraftHeight, defaultTreadles, defaultWeftColor } from '@/app/resources/constants/weaveDefaults'

import { createGrid } from '../../utils'


export function readWeft(weft: TreadlingDescription, height: number) {

    let width = weft.count || defaultTreadles
    let weftGrid: grid = createGrid(width, height)

    //If grid has not been filled in, return an empty grid of correct size
    if (weft.pattern == null || !(weft.pattern.length > 0)) {
        return weftGrid
    }

    let colorsCopy = JSON.parse(JSON.stringify(weft.colors))
    
    //Fill the grid
    weft.pattern.forEach((treadle, index) => {
        let currentColor = defaultWeftColor
        if (colorsCopy) {
            currentColor = colorsCopy[0].color
            colorsCopy[0].threads--
            if (colorsCopy[0].threads == 0) {
                colorsCopy.shift()
            }
        }
        
        weftGrid[index][treadle] = currentColor
    })

    //Adjust the filled in treadling to the bottom (where tie-up is) if needed
    let lastIndex = weftGrid.length - 1

    for (let i = lastIndex; i >= 0; i--) {

        if (weftGrid[lastIndex].find(element => element != '')) {
            return weftGrid
        } else {
            weftGrid.unshift(weftGrid.pop() as color[])
        }
    }

    return weftGrid

}
