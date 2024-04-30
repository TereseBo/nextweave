import { testItems, testWarpLengthData } from '@/__tests__/test_data/warpTestData'
import { calculateNewWarpLength } from '@/app/resources/functions/calculator/warplength'

describe('Basic calculations on warp width return expected result', () => {

    it('Total from total', () => {
        const expectedItem = {
            length: 195,
            firsthem: 24,
            secondhem: 24,
        }
        const warp = calculateNewWarpLength('total', 700, testWarpLengthData)

        //Values expected to change
        expect(warp.total).toBe(700)
        expect(warp.items.length).toBe(testWarpLengthData.items.length)
        expect(warp.items[0]).toStrictEqual(expectedItem)

        //Values expectet to remain the same
        expect(warp.waste).toBe(testWarpLengthData.waste)
        expect(warp.lash_on).toBe(testWarpLengthData.lash_on)
        expect(warp.take_up).toBe(testWarpLengthData.take_up)
        expect(warp.shrinkage).toBe(testWarpLengthData.shrinkage)
    })

    it('Total from items', () => {
        const expectedItem = {
            length: 50,
            firsthem: 10,
            secondhem: 10,
        }
        const warp = calculateNewWarpLength('items', 4, testWarpLengthData)

        //Values expected to change
        expect(warp.total).toBe(439)
        expect(warp.items.length).toBe(4)
        expect(warp.items[0]).toStrictEqual(expectedItem)

        //Values expectet to remain the same
        expect(warp.waste).toBe(testWarpLengthData.waste)
        expect(warp.lash_on).toBe(testWarpLengthData.lash_on)
        expect(warp.take_up).toBe(testWarpLengthData.take_up)
        expect(warp.shrinkage).toBe(testWarpLengthData.shrinkage)
    })

    it('Total from changed item', () => {
        const expectedItem = {
            length: 50,
            firsthem: testItems[1].firsthem,
            secondhem: testItems[1].secondhem,
        }
        const warp = calculateNewWarpLength('piece:1:length', 50, testWarpLengthData)

        //Values expected to change
        expect(warp.total).toBe(330)
        expect(warp.items.length).toBe(2)
        expect(warp.items[1]).toStrictEqual(expectedItem)

        //Values expectet to remain the same
        expect(warp.waste).toBe(testWarpLengthData.waste)
        expect(warp.lash_on).toBe(testWarpLengthData.lash_on)
        expect(warp.take_up).toBe(testWarpLengthData.take_up)
        expect(warp.shrinkage).toBe(testWarpLengthData.shrinkage)
    })
})
