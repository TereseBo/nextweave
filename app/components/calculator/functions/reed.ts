//Calculations starting from reed and for matching density of reed to epc
import { isZeroish } from './isZeroish';



export function reedMatch(warp: WarpWidthData, reed: Reed,) {
    let match = true
    let density = reed.dents / reed.section
    if (warp.epc % density) {
        match = false
    }
    return match
}

export function calculateEpcFromReed(dents: number, section: number, tpd: number) {
    if (isZeroish(dents) || isZeroish(section) || isZeroish(tpd)) {
        return 0;
    }
    return Math.round((dents / section) * tpd);
}