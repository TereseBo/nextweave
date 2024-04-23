//Context handling information and calculations between different parts (aka treadles, shafts, tieups) of the draft and calculates the weave.
//dependencies
import { createContext, useContext,useEffect, useState } from 'react'

import { readWeaveObject } from '@/app/components/draft/weaveObjHandler/set/readWeaveObject'
import { defaultColor, defaultDraftHeight, defaultDraftWidth, defaultShafts, defaultTreadles } from '@/app/resources/constants/weaveDefaults'
import { resizeGrid } from '@/app/resources/functions/resizeGrid'

import { WeaveContextType } from '../types/contexts'
//exports
const WeaveContext = createContext<WeaveContextType | null>(null)

export function WeaveProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {
  //States used in grid creation
  const [draftHeight, setDraftheight] = useState<number>(defaultDraftHeight)
  const [draftWidth, setDraftwidth] = useState<number>(defaultDraftWidth)
  const [shafts, setShafts] = useState<number>(defaultShafts)
  const [treadles, setTreadles] = useState<number>(defaultTreadles)

  //Inital grids are empty, representing no color filled in 
  const [warpGrid, setWarpGrid] = useState<grid>()
  const [treadleGrid, setTreadleGrid] = useState<grid>()
  const [tieUpGrid, setTieUpGrid] = useState<grid>()


  const [warpColors, setWarpColors] = useState<colorCollection>([])
  const [weftColors, setWeftColors] = useState<colorCollection>([])
  const [currentColor, setCurrentColor] = useState<color>(defaultColor)

  //Keeps grids updated on preferences change 
  useEffect(() => {

    setWarpGrid((prevValue) => { return resizeGrid(prevValue, shafts, draftWidth) })
    setTreadleGrid((prevValue) => { return resizeGrid(prevValue, draftHeight, treadles) })
    setTieUpGrid((prevValue) => { return resizeGrid(prevValue, shafts, treadles) })

  }, [shafts, draftHeight, draftWidth, treadles])


  function initiateGrids() {
    if (!warpGrid) setWarpGrid(new Array(shafts).fill(new Array(draftWidth).fill('', 0)))
    if (!treadleGrid) setTreadleGrid(new Array(draftHeight).fill(new Array(treadles).fill('', 0)))
    if (!tieUpGrid) setTieUpGrid(new Array(shafts).fill(new Array(treadles).fill('', 0)))
  }

  function emptyGrids() {
     setWarpGrid(new Array(shafts).fill(new Array(draftWidth).fill('', 0)))
     setTreadleGrid(new Array(draftHeight).fill(new Array(treadles).fill('', 0)))
     setTieUpGrid(new Array(shafts).fill(new Array(treadles).fill('', 0)))
  }

  //Keeps the state for warpcolors on updated
  useEffect(() => {
    if (!warpGrid) {
      setWarpColors([])
      return
    }
    let uniqueColors: color[] = []
    warpGrid.forEach(row => {
      let colors = row.filter((color) => color != '' && !uniqueColors.includes(color))
      uniqueColors = uniqueColors.concat(colors)
    })
    setWarpColors(Array.from(new Set(uniqueColors)))
  }, [warpGrid])

  //Keeps the state for weftcolors on updated
  useEffect(() => {
    if (!treadleGrid) {
      setWeftColors([])
      return
    }
    let uniqueColors: color[] = []
    treadleGrid.forEach(row => {
      let colors = row.filter((color) => color != '' && !uniqueColors.includes(color))
      uniqueColors = uniqueColors.concat(colors)
    })
    setWeftColors(Array.from(new Set(uniqueColors)))
  }, [treadleGrid])

  //Returns a deepcopy of a grid by name
  function copyGrid(gridName: gridName) {
    let gridCopy = []
    switch (gridName) {
      case 'warp':
        gridCopy = JSON.parse(JSON.stringify(warpGrid))
        break
      case 'weft':
      case 'treadle':
        gridCopy = JSON.parse(JSON.stringify(treadleGrid))
        break
      case 'tieup':
        gridCopy = JSON.parse(JSON.stringify(tieUpGrid))
        break
    }
    return gridCopy as grid
  }

  //Accepts the name and new value of a grid and updates this state accordingly
  function updateGrid(gridName: gridName, newValue: grid) {
    //Updates the named grid with the supplied value
    switch (gridName) {
      case 'warp':
        setDraftwidth(newValue[0].length)
        setShafts(newValue.length)
        setWarpGrid(newValue)
        break
      case 'weft':
      case 'treadle':
        setDraftheight(newValue.length)
        setTreadles(newValue[0].length)
        setTreadleGrid(newValue)
        break
      case 'tieup':
        setTieUpGrid(newValue)
        break
    }
  }

  function upSetGrids(weaveObj: WeaveObject): void {

    let newGrids = readWeaveObject(weaveObj)

    updateGrid('tieup', newGrids.tieUpGrid)
    updateGrid('warp', newGrids.warpGrid)
    updateGrid('weft', newGrids.treadleGrid)
  }

  //Changes content of grid-array depending on cell-id
  function updateCell(cellId: string) {
    //x and y specifies the x and y coordinates in the grid
    const [gridName, x, y] = cellId.split('-') as [gridName, number, number]
    if (gridName == undefined || x == undefined || y == undefined) {
      return
    }

    let gridCopy = copyGrid(gridName)
    let newColor = ''
    if (gridName == 'tieup') {
      newColor = '#000000'
    } else {
      newColor = currentColor
    }
    //If warp, clear other cells in column.
    if (gridName == 'warp') {
      for (let i = 0; i < shafts; i++) {
        if (i != y) {
          gridCopy[i][x] = ''
        }
      }
    }
    //If weft, clear other cells in row.
    if (gridName == 'treadle') {
      for (let i = 0; i < treadles; i++) {
        if (i != x) {
          gridCopy[y][i] = ''
        }
      }
    }

    gridCopy[y][x] = gridCopy[y][x] == '' ? newColor : ''
    //State is updated
    updateGrid(gridName, gridCopy)
  }

  function colorChange(cellId: string, newColor: color) {
    const [gridName, previousColor] = cellId.split('-') as [gridName, color]
    const gridCopy = copyGrid(gridName)

    let reColoredGrid = gridCopy.map((row, index) => {
      const newRow = row.map(color => {
        return color == previousColor ? newColor : color
      })
      return newRow
    })
    updateGrid(gridName, reColoredGrid)

  }

  return (

    <WeaveContext.Provider value={{ updateGrid, setShafts, setTreadles, treadles, initiateGrids, draftHeight, draftWidth, treadleGrid, warpGrid, tieUpGrid, updateCell, shafts, warpColors, weftColors, currentColor, setCurrentColor, colorChange, upSetGrids, emptyGrids }}>
      {children}
    </WeaveContext.Provider>
  )
}


//Hook to use the weavecontext
export function useWeaveContext() {
  const context = useContext(WeaveContext);

  if (!context) {
      throw new Error('Weavecontext must be used inside weaver');
  }

  return context;
};


