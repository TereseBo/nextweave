import {lowerGridLimit} from '../../constants/weaveDefaults'

//Function returns true if no color is filled in a grid
export function isEmptyGrid(grid: grid): boolean {
    let isEmpty: boolean = false
    grid.flat().find((element) => element !== '') ? isEmpty = false : isEmpty = true

    return isEmpty
}

//Function returns true if no color is filled in any og the grids included in a gridSet
export function isEmptyDraftData(grids: GridSet): boolean {
    let isEmpty = true
    for (const [key, value] of Object.entries(grids)) {
        if (isEmptyGrid(value) === false) {
            isEmpty = false
            break
        }
    }
    return isEmpty
}
