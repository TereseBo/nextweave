
export function updateGrid(grid:grid, cellId: string, color: color)/* : (grid: grid, cellId: string, color: color) => (grid) */{

    const gridCopy = JSON.parse(JSON.stringify(grid))
    const [gridType, x, y] = cellId.split('-') as [gridName, number, number]

    if (gridType == undefined || x == undefined || y == undefined ) {
        return gridCopy
    }

    let newColor = color
    //Tieup allways has black fill
    if (gridType == 'tieup') {
        newColor = '#000000'
    } 
    
    //If warp, clear other cells in column.
    if (gridType == 'warp') {
        const shafts = gridCopy.length
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
    gridCopy[y][x]=gridCopy[y][x] == '' ? newColor : ''

    //return the updated grid
    return gridCopy

}