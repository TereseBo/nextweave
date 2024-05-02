
//Draft defaults
const defaultShafts= 8
const defaultTreadles=6
const defaultDraftHeight=50
const defaultDraftWidth=30
const defaultColor='#000000'
const defaultWeftColor='#0313fc'
const defaultWarpColor='#878787'
const defaultTieUpColor='#000000'

//Shaft and treadle value limits
const lowerAccessoryGridLimit=2
const upperAccessoryGridLimit=24


//Loom defaults
const loomTypes:LoomType[]=['Countermarch', 'Counterbalance', 'Jack loom', 'Rigid heddle','Draw loom']
const loomMakers:string[]=['Glimåkra', 'Schacht']

const templateLoom: Loom = {
    id: undefined,
    shafts: defaultShafts,
    treadles: defaultTreadles,
    brand: loomMakers[0],
    type: loomTypes[0]
}


//Reed defaults
const reedUnits:ReedUnit[]=['cm','in']

const templateReed: Reed = {
    id: undefined,
    section: 10,
    dents: 50,
    unit: reedUnits[0],
    length: 100
}

export {defaultColor,defaultDraftHeight, defaultDraftWidth, defaultShafts, defaultTieUpColor, defaultTreadles, defaultWarpColor, defaultWeftColor, loomTypes, lowerAccessoryGridLimit,reedUnits, templateLoom, templateReed, upperAccessoryGridLimit}

