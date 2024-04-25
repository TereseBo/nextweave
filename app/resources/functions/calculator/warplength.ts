//Calculations relating to length

import { roundToTwoDec } from './roundToTwo'

export function calculateNewWarpLength(target: string, value: any, warpData: WarpLengthData) {

    const inputValue = value
    const [fieldId, itemId, itemField] = target.split(':')
    const newWarp = { ...warpData }

    switch (fieldId) {
        case 'piece':
            newWarp.items[Number(itemId)][itemField as keyof Item] = inputValue
            break;
        case 'items':
            //creates array with unique item-objects
            const newItems = new Array(Number(inputValue))
            for (let i = 0; i < inputValue; newItems[i++] = { length: 50, firsthem: 10, secondhem: 10 });
            newWarp.items = newItems
            break;
        case 'total':
            newWarp.total = inputValue
            const nrOfItems = newWarp.items.length
            if (nrOfItems > 0) {
                newWarp.items = calculateFinishedItemLength(newWarp)
            }
            break;
        default:
            newWarp[fieldId as keyof WarpLengthData] = value
    }
    if (fieldId !== 'total') {
        newWarp['total'] = calculateWarpLength(newWarp)
    }

    return newWarp
}

//Returns required total warplength for warpdata object, assumes finished length is specefied in items
export function calculateWarpLength(warpLengthData: WarpLengthData): number {
    const { lash_on, waste, shrinkage, take_up, items } = warpLengthData
    let fixedLength = calculateSumLength(lash_on, waste);
    let itemsLength = undefined

    items.length > 0 ? itemsLength = calculateItemWarpLength(items, take_up, shrinkage) : itemsLength = 0

    const total = warpLength(fixedLength, itemsLength)

    return Math.ceil(total)
}

//Returns required warplength for all items combined, assumes finished length is specefied in items
function calculateItemWarpLength(items: Item[], take_up: number, shrinkage: number): number {
    const itemLengths: number[] = items.map(item => Number(item.firsthem) + Number(item.secondhem) + Number(item.length))
    const combinedLength: number = itemLengths.reduce((a, b) => a + b, 0)
    const beforeWashShrinkage = combinedLength * (1 + shrinkage / 100)
    const beforeWeaveIn = beforeWashShrinkage * (1 + take_up / 100)

    return roundToTwoDec(beforeWeaveIn)
}

function calculateSumLength(...fixed: number[]) {//sums all params
    let sum = fixed.reduce((a, b) => Number(a) + Number(b), 0)
    return sum
}

function warpLength(itemsLength: number, fixed: number) {
    return itemsLength + fixed
}

//Returns items with equally distributed (finished) length.
export function calculateFinishedItemLength(warpLengthData: WarpLengthData): Item[] {
    let itemLength = 0
    let itemHem = 0
    const { lash_on, waste, shrinkage, take_up, items, total } = warpLengthData

    const nrOfItems = items.length
    const combinedLength = total - lash_on - waste
    if (combinedLength > 0) {

        const afterWeaveIn = combinedLength * (1 - take_up / 100)
        const afterWashShrinkage = afterWeaveIn * (1 - shrinkage / 100)
        const perItemTotal = afterWashShrinkage / nrOfItems

        itemLength = Math.ceil(perItemTotal * 0.8)
        itemHem = Math.floor(perItemTotal * 0.1)
    }
    const calculatedItems: Item[] = new Array(nrOfItems)
    for (let i = 0; i < nrOfItems; calculatedItems[i++] = { length: itemLength, firsthem: itemHem, secondhem: itemHem });

    return calculatedItems
}