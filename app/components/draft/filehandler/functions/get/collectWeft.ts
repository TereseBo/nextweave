import { getHighest } from '../utils'

export function collectWeft(weft: grid) {

    let newColor: color = '';
    let colorPatternTracker = 0;
    let pattern: number[] = [];
    let colors: ColorDescription[] = [];
    let previousColor: color | undefined = undefined;

    let treadle = null;
    weft.forEach(row => {

        row.forEach((cell, index) => {
            //TODO: Add possibility for dual treadling
            if (cell != '') {
                newColor = cell
                treadle = index
                pattern.push(treadle);
                if (newColor === previousColor) {
                    colorPatternTracker++;
                    previousColor = newColor;

                } else {
                    colorPatternTracker++;
                    colors.push({ color: previousColor || '', threads: colorPatternTracker });
                    colorPatternTracker = 0;
                    previousColor = newColor;
                }
            }
        })
    })
    colors.push({ color: previousColor || 'bob', threads: colorPatternTracker + 1 });
    colors.shift()
    let treadling: TreadlingDescription = {
        count: getHighest(pattern), //OK
        pattern: pattern, // Pattern ok
        pattern_repeat: null,
        colors: colors
    }
    return treadling

}