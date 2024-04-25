//This function returns a new grid of the requested size, retaining the content of the old grid if applicable
import { createGrid } from './createGrid'

export function resizeGrid(oldGrid: grid | undefined, newHeight: number, newWidth: number): grid {

  //Return a new empty grid if no grid was supplied
  if (!oldGrid) {
    const newGrid = createGrid(newWidth, newHeight)
    return newGrid
  }

  let gridCopy: grid = JSON.parse(JSON.stringify(oldGrid)) 

  //If grid does not need resizing, return copy of original grid
  if(oldGrid.length===newHeight && oldGrid[0].length===newWidth){
    return gridCopy
  }

  let emptySubArray: string[] = new Array(newWidth).fill('', 0)


  //If grid is to shrink, remove exess elements else add elements with expected contents until requested length (both in x and y direction)
  gridCopy.length > newHeight ? gridCopy.splice(newHeight) : gridCopy = gridCopy.concat(new Array(newHeight - gridCopy.length).fill(JSON.parse(JSON.stringify(emptySubArray))))

  if (gridCopy[0].length > newWidth) {
    gridCopy.forEach(row => {
      row.splice(newWidth)
    });
  } else if (gridCopy[0].length < newWidth) {

    gridCopy.forEach((row, index) => {
      let addition = new Array(newWidth - row.length).fill('', 0)
      gridCopy[index] = row.concat(JSON.parse(JSON.stringify(addition)))
    });
  }

  return gridCopy
}