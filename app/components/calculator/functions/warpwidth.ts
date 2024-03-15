//Functions for handeling individual calculations of weave width and function for associated form 
import { isZeroish } from './isZeroish'
import { calculateEpcFromReed } from './reed'
import { roundToTwoDec } from './roundToTwo'

export function calculateWarpWidth(target: string, value: number, warpin: WarpWidthData, reedin: Reed) {

    const warp = JSON.parse(JSON.stringify(warpin))
    const reed = JSON.parse(JSON.stringify(reedin))

    switch (target) {
        //Warp data
        case ('ends'):
            warp.ends = value
            warp.width = calculateWeaveWidth(warp.ends, warp.epc)
            break;
        case 'epc':
            warp.epc = value
            warp.width = calculateWeaveWidth(warp.ends, warp.epc)
            break;
        case 'width':
            warp.width = value
            warp.ends = calculateWarpEnds(warp.epc, warp.width)
            break;
        //Reed data
        case ('dents'):
            reed.dents = value
            warp.epc = calculateEpcFromReed(reed.dents, reed.section, reed.tpd)
            warp.width = calculateWeaveWidth(warp.ends, warp.epc)
            break;
        case ('section'):
            reed.section = value
            warp.epc = calculateEpcFromReed(reed.dents, reed.section, reed.tpd)
            warp.width = calculateWeaveWidth(warp.ends, warp.epc)
            break;
        case ('tpd'):
            reed.tpd = value
            warp.epc = calculateEpcFromReed(reed.dents, reed.section, reed.tpd)
            warp.width = calculateWeaveWidth(warp.ends, warp.epc)
            break;
        case ('tph'):
            reed.tph = value
            break;
        default:
            break;
    }
    return { warp, reed }
}

//Calculations 
function calculateWeaveWidth(ends: number, epc: number) {
    if (isZeroish(ends) || isZeroish(epc)) {
        return 0;
    }

    return roundToTwoDec(ends / epc);
}

export function calculateWarpEpc(ends: number, width: number) {
    if (isZeroish(ends) || isZeroish(width)) {
        return 0;
    }
    return Math.round(ends / width);
}

function calculateWarpEnds(epc: number, width: number) {
    if (isZeroish(epc) || isZeroish(width)) {
        return 0;
    }
    return Math.round(epc * width);
}



