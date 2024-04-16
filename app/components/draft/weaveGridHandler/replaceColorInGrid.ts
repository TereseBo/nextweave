export function replaceColorInGrid(grid:grid, previousColor:color, newColor:color){

    const gridCopy:grid=JSON.parse(JSON.stringify(grid))

    let reColoredGrid = gridCopy.map((row, index) => {
      const newRow = row.map(color => {
        return color == previousColor ? newColor : color
      })
      return newRow
    })
    return reColoredGrid
}