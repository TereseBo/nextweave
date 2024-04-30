//This file contain test values

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

const testWarpLengthData: WarpLengthData = {
    waste: 50,
    lash_on: 50,
    take_up: 10,
    shrinkage: 10,
    items: testItems,
    total: 391
}

const testWarpWidthData: WarpWidthData = {
    epc: 5,
    ends: 500,
    width: 100
 }

export { testItems, testWarpLengthData, testWarpWidthData}