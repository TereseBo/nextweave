type grid=color[][]
type gridName='weave' | 'tieup'|'warp'|'treadle'|'weft'

type GridSet={
    warpGrid:grid, 
    tieUpGrid:grid, 
    treadleGrid:grid,
    weave?:grid
}
