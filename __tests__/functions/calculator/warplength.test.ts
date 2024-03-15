import { calculateNewWarpLength } from '@/components/calculator/functions/warplength'

describe('Basic calculations on warp width return expected result', () => {
    const testItems = [
        {
            length: 100,
            firsthem: 10,
            secondhem: 10,
        },
        {
            length: 100,
            firsthem: 10,
            secondhem: 10,
        }
    ]

    const testWarp: WarpLengthData = {
        waste: 50,
        lash_on: 50,
        take_up: 10,
        shrinkage: 10,
        items: testItems,
        total: 391
    }

    it('Total from total', () => {
        const expectedItem = {
            length: 195,
            firsthem: 24,
            secondhem: 24,
        }
        const warp = calculateNewWarpLength('total', 700, testWarp)

        //Values expected to change
        expect(warp.total).toBe(700)
        expect(warp.items.length).toBe(testWarp.items.length)
        expect(warp.items[0]).toStrictEqual(expectedItem)

        //Values expectet to remain the same
        expect(warp.waste).toBe(testWarp.waste)
        expect(warp.lash_on).toBe(testWarp.lash_on)
        expect(warp.take_up).toBe(testWarp.take_up)
        expect(warp.shrinkage).toBe(testWarp.shrinkage)
    })

    it('Total from items', () => {
        const expectedItem = {
            length: 50,
            firsthem: 10,
            secondhem: 10,
        }
        const warp = calculateNewWarpLength('items', 4, testWarp)

        //Values expected to change
        expect(warp.total).toBe(439)
        expect(warp.items.length).toBe(4)
        expect(warp.items[0]).toStrictEqual(expectedItem)

        //Values expectet to remain the same
        expect(warp.waste).toBe(testWarp.waste)
        expect(warp.lash_on).toBe(testWarp.lash_on)
        expect(warp.take_up).toBe(testWarp.take_up)
        expect(warp.shrinkage).toBe(testWarp.shrinkage)
    })

    it('Total from changed item', () => {
        const expectedItem = {
            length: 50,
            firsthem: testItems[1].firsthem,
            secondhem: testItems[1].secondhem,
        }
        const warp = calculateNewWarpLength('piece:1:length', 50, testWarp)

        //Values expected to change
        expect(warp.total).toBe(330)
        expect(warp.items.length).toBe(2)
        expect(warp.items[1]).toStrictEqual(expectedItem)

        //Values expectet to remain the same
        expect(warp.waste).toBe(testWarp.waste)
        expect(warp.lash_on).toBe(testWarp.lash_on)
        expect(warp.take_up).toBe(testWarp.take_up)
        expect(warp.shrinkage).toBe(testWarp.shrinkage)
    })
})
