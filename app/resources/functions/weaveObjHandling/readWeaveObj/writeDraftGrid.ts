
//This file exports the function to create a weaveGrid from a gridSet. It also contains the required helperfunctions.
//Returns the color if present for the beat

import { createGrid } from '../../utils'

//Returns the color of a specified beat
function getWeftColor(y: number, treadleGrid: grid) {
    if (!treadleGrid[y]) {
        return undefined
    }
    let color = treadleGrid[y].find(isColored)
    return color
}

//Returns the color of the warp for a specified thread
function getWarpColor(x: number, warpGrid: grid) {

    let warpColumn = []
    for (let i = 0; i < warpGrid.length; i++) {

        warpColumn.push(warpGrid[i][x])
    }
    let warpColor = warpColumn.find(isColored)

    return warpColor
}

//Returns positive integer corresponding to the index of warped shaft or -1
function getWarpedShaft(x: number, warpGrid: grid) {
    const shafts = warpGrid.length

    for (let i = 0; i <= shafts; i++) {
        if (warpGrid[i][x] != '') {
            return i
        }
    }
    return -1
}

//Returns true if shaft and treadle are connected
function isTiedUp(shaft: number, treadle: number, tieUpGrid: grid) {
    if (!tieUpGrid) return
    return tieUpGrid[shaft][treadle] != ''
}

//Returns true if the grid position is colored
function isColored(gridItem: color) {
    return gridItem !== '';
}

//Creates a grid and uppdates it's color in accordance with a gridSet.
export function createWeave(grids: GridSet, draftHeight: number, draftWidth: number): grid {

    const { treadleGrid, warpGrid, tieUpGrid } = grids

    //Create empty grid
    let grid = createGrid(draftWidth, draftHeight)

    grid.forEach((row: color[], y: number) => {

        let weftColor = getWeftColor(y, treadleGrid)


        row.forEach((cell: color, x: number) => {

            let warpColor = getWarpColor(x, warpGrid)

            if (weftColor == undefined) {

                //Set each cell with warpcolor to warpcolor, no color if no warp
                warpColor != undefined ? grid[y][x] = warpColor : grid[y][x] = ''

            } else {
                //console.log('there was a weft')
                // console.log('weftcolor ' + weftColor + ', for row ' + y)
                if (warpColor) {

                    let treadleNr = treadleGrid ? treadleGrid[y].indexOf(weftColor) : undefined
                    let shaftNr = getWarpedShaft(x, warpGrid)

                    //Check tie-up on pos y/x if colored set weft otherwise warp
                    if (shaftNr != undefined && treadleNr != undefined) {
                        (isTiedUp(shaftNr, treadleNr, tieUpGrid)) ? grid[y][x] = weftColor : grid[y][x] = warpColor
                    }
                } else {
                    //No warp but weftcolor displays weft
                    grid[y][x] = weftColor
                }
            }
        })
    })
    return grid

}
