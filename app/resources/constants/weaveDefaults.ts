const defaultShafts= 8
const defaultTreadles=6
const defaultDraftHeight=50
const defaultDraftWidth=30
const defaultColor='#000000'
const defaultWeftColor='#0313fc'
const defaultWarpColor='#878787'


//Reed defaults
const reedUnits:ReedUnit[]=['cm','in']

const templateReed: Reed = {
    id: undefined,
    section: 10,
    dents: 50,
    unit: reedUnits[0],
    length: 100
}

export {defaultColor,defaultDraftHeight, defaultDraftWidth, defaultShafts, defaultTreadles, defaultWarpColor, defaultWeftColor, reedUnits, templateReed}

