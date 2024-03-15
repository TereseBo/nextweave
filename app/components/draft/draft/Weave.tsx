//This component contains the logic for calculating the weave
import './weave.scss';

import { useContext, useEffect, useState } from 'react'

import { Grid } from '@/app/components/draft/draft/Grid'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'
import { resizeGrid } from '@/app/resources/functions/resizeGrid'

export function Weave() {
  const { draftHeight, draftWidth, treadleGrid, shafts, tieUpGrid, warpGrid } = useContext(WeaveContext) as WeaveContextType
  const [weaveGrid, setWeaveGrid] = useState<grid>(new Array(draftHeight).fill(new Array(draftWidth).fill('', 0)))

  useEffect(() => {

    //Returns the color if present for the beat
    function getWeftColor(y: number) {
      if (!treadleGrid) return

      let color = treadleGrid[y].find(isColored)
      return color
    }

    //Returns true if the grid position is colored
    function isColored(gridItem: color) {
      return gridItem !== '';
    }

    //Returns the color of the warp for the requested position
    function getWarpColor(x: number) {

      if (!warpGrid) return

      let warpColumn = []
      for (let i = 0; i < warpGrid.length; i++) {

        warpColumn.push(warpGrid[i][x])
      }
      let warpColor = warpColumn.find(isColored)

      return warpColor
    }

    //Returns positive integer corresponding to the index of warped shaft
    function getWarpedShaft(x: number) {
      if (!warpGrid) return

      for (let i = 0; i <= shafts; i++) {
        if (warpGrid[i][x] != '') {
          return i
        }
      }
      return -1
    }

    //Returns true if shaft and treadle are connected
    function isTiedUp(shaft: number, treadle: number) {
      if (!tieUpGrid) return
      return tieUpGrid[shaft][treadle] != ''
    }

    //Copies weavestate and updates colors according to warp, treadling and tie-up, returns the updated weave
    function updateWeave(weave: grid): grid {
      //Resize if needed
      let gridCopy = resizeGrid(weave, draftHeight, draftWidth) as grid


      gridCopy.forEach((row: color[], y: number) => {
        let weftColor = getWeftColor(y)

        row.forEach((cell: color, x: number) => {

          let warpColor = getWarpColor(x)

          if (weftColor == undefined) {
            //Set each cell with warpcolor to warpcolor, no color if no warp
            warpColor != undefined ? gridCopy[y][x] = warpColor : gridCopy[y][x] = ''

          } else {

            if (warpColor) {

              let treadleNr = treadleGrid ? treadleGrid[y].indexOf(weftColor) : undefined
              let shaftNr = getWarpedShaft(x)

              //Check tie-up on pos y/x if colored set weft otherwise warp
              if (shaftNr != undefined && treadleNr != undefined) {
                (isTiedUp(shaftNr, treadleNr)) ? gridCopy[y][x] = weftColor : gridCopy[y][x] = warpColor
              }
            } else {
              //No warp but weftcolor displays weft
              gridCopy[y][x] = weftColor
            }
          }
        })
      })
      return gridCopy

    }

    setWeaveGrid(prevValue => updateWeave(JSON.parse(JSON.stringify(prevValue))))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warpGrid, treadleGrid, tieUpGrid,])

  return (
    <Grid content={weaveGrid} type='weave' />
  )

}