
import { defaultTieUpColor } from  '@/app/resources/constants/weaveDefaults'

export function updateGrid(grid: grid, cellId: string, color: color):grid{

    const gridCopy = JSON.parse(JSON.stringify(grid))
    const [gridType, x, y] = cellId.split('-') as [gridName, number, number]

    const shafts = gridCopy.length
    const treadles = gridCopy[0].length

    //Return copy of original grid if id is not in expected format
    if (gridType == undefined || x == undefined || y == undefined) {
        return gridCopy
    }
    if (y >= shafts || x >= treadles) {
        return gridCopy
    }


    let newColor = color
    //Tieup allways has black fill
    if (gridType == 'tieup') {
        newColor = defaultTieUpColor
    }

    //If warp, clear other cells in column.
    if (gridType == 'warp') {

        for (let i = 0; i < shafts; i++) {
            if (i != y) {
                gridCopy[i][x] = ''
            }
        }
    }

    //If weft, clear other cells in row.
    if (gridType == 'treadle') {
        const treadles = gridCopy[0].length
        for (let i = 0; i < treadles; i++) {
            if (i != x) {
                gridCopy[y][i] = ''
            }
        }
    }

    //Toggle the color of the cell
    gridCopy[y][x] = gridCopy[y][x] == '' ? newColor : ''

    //return the updated grid
    return gridCopy

}