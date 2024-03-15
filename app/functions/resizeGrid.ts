export function resizeGrid(oldGrid: grid | undefined, newHeight: number, newWidth: number): grid | undefined {

  if (!oldGrid) { return oldGrid }

  let emptySubArray: string[] = new Array(newWidth).fill('', 0)
  let gridCopy: grid = JSON.parse(JSON.stringify(oldGrid))

  gridCopy.length > newHeight ? gridCopy.splice(newHeight) : gridCopy = gridCopy.concat(new Array(newHeight - gridCopy.length).fill(JSON.parse(JSON.stringify(emptySubArray))))

  if (gridCopy[0].length > newWidth) {
    gridCopy.forEach(row => {
      row.splice(newWidth)
    });
  } else if (gridCopy[0].length < newWidth) {

    gridCopy.forEach((row, index) => {
      let addition = new Array(newWidth - row.length).fill('', 0)
      gridCopy[index] = row.concat(addition)
    });
  }

  return gridCopy
}