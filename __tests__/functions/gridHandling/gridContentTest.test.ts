import { emptyTestGrid, gridNames, testColor1, testColor2, testColor3, xyValues } from '@/__tests__/test_data/gridTestData'
import { defaultTieUpColor } from '@/app/resources/constants/weaveDefaults'
import { replaceColorInGrid } from '@/app/resources/functions/gridHandling/replaceColorInGrid'
import { updateGrid } from '@/app/resources/functions/gridHandling/updateGrid'


describe('Basic operations on grid content should return the expected result', () => {
    //GIVEN an empty colorgrid

    test.each(xyValues)('Recolors expected cell in a grid', (x, y) => {

        //WHEN the content is changed
        const updatedGrid = updateGrid(emptyTestGrid, `warp-${x}-${y}`, testColor1)

        //THEN assert the grid has expected color in expected position
        expect(updatedGrid.length).toEqual(emptyTestGrid.length)
        expect(updatedGrid[0].length).toBe(emptyTestGrid[0].length)


        if (emptyTestGrid.length >= y && emptyTestGrid[0].length >= x) {
            expect(updatedGrid[y][x]).toEqual(testColor1)

        } else {

            expect(updatedGrid).toStrictEqual(emptyTestGrid)
        }
    })

    test.each(gridNames)('Recolors expected cell in expected way in a grid', (gridName) => {

        //WHEN the content is changed
        const updatedGrid = updateGrid(emptyTestGrid, `${gridName}-0-0`, testColor1)

        //THEN assert the grid has expected color in expected position
        expect(updatedGrid.length).toEqual(emptyTestGrid.length)
        expect(updatedGrid[0].length).toBe(emptyTestGrid[0].length)


        if (gridName === 'tieup') {
            expect(updatedGrid[0][0]).toEqual(defaultTieUpColor)

        } else {
            expect(updatedGrid[0][0]).toEqual(testColor1)
        }
    })

    it('Updating grid with bad data will ', () => {

        //GIVEN a colored grid
        let coloredGrid = emptyTestGrid
        xyValues.forEach(coordinateArr => {
            coloredGrid = updateGrid(coloredGrid, `warp-${coordinateArr[0] - coordinateArr[1]}`, testColor1)
        })

        //WHEN replacing a tpresent color
        const reColoredGrid = replaceColorInGrid(coloredGrid, testColor1, testColor2)

        //THEN all inzstances of the color should have been replaced
        expect(reColoredGrid.flat().includes(testColor1)).toBe(false)

    })

    it('Grid is recolored in all positions of a color', () => {

        //GIVEN a colored grid
        let coloredGrid = emptyTestGrid
        xyValues.forEach(coordinateArr => {
            coloredGrid = updateGrid(coloredGrid, `warp-${coordinateArr[0] - coordinateArr[1]}`, testColor1)
        })

        //WHEN replacing a tpresent color
        const reColoredGrid = replaceColorInGrid(coloredGrid, testColor1, testColor2)

        //THEN all inzstances of the color should have been replaced
        expect(reColoredGrid.flat().includes(testColor1)).toBe(false)

    })
    it('Grid is not recolorod for other color than expected', () => {

        //GIVEN a two colored grid
        let coloredGrid = emptyTestGrid
        xyValues.forEach(coordinateArr => {
            coloredGrid = updateGrid(coloredGrid, `warp-${coordinateArr[0] - coordinateArr[1]}`, testColor1)
        })
        coloredGrid[0][0] = testColor2

        //WHEN replacing a present color
        const reColoredGrid = replaceColorInGrid(coloredGrid, testColor1, testColor3)


        //THEN all instances of the color should have been replaced, while other colors remain unchanged
        expect(reColoredGrid.flat().includes(testColor1)).toBe(false)
        expect(reColoredGrid.flat().includes(testColor2)).toEqual(true)

    })

})


