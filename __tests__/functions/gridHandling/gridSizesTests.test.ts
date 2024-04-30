import { xyValues } from '@/__tests__/test_data/gridTestData';
import { createGrid } from '@/app/resources/functions/gridHandling/createGrid';
import { resizeGrid } from '@/app/resources/functions/gridHandling/resizeGrid';

describe('Basic operations on grid sizing should retuirn the expected result', () => {


    test.each(xyValues)('resizes grid as expected', (width, height) => {
        //GIVEN width and height
        //WHEN a grid has been created
        const createdGrid = createGrid(width, height)

        //THEN assert grid has requested size and subGrids are not referencing the same object
        expect(createdGrid.length).toEqual(height)
        expect(createdGrid[0].length).toEqual(width)
        expect(createdGrid[0] === createdGrid[1]).toBe(false)

    })

    test.each(xyValues)('resizes grid as expected', (newWidth, newHeight) => {

        //GIVEN a grid with specified width and height
        const originalGrid = createGrid(5, 10)

        //WHEN grid has been resized
        let resizedGrid = resizeGrid(originalGrid, newHeight, newWidth)

        //THEN assert grid has requested size and subGrids are not referencing the same object
        expect(resizedGrid.length).toEqual(newHeight)
        expect(resizedGrid[0].length).toEqual(newWidth)
        expect(resizedGrid[0] === originalGrid[0]).toBe(false)

        if (resizedGrid.length > 2) {
            expect(resizedGrid[0] === resizedGrid[1]).toBe(false)
        }
    })

})


