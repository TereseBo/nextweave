type ColorDescription={color:color, threads:number}

type ShaftDescription = {
    count: null | number,
    pattern: number[],
    pattern_repeat: null | number,
    colors:ColorDescription[]
}

type TreadlingDescription = {
    count: null | number,
    pattern: number[],
    pattern_repeat: null | number,
    colors: ColorDescription[]
}

type WeaveObject = {
    shafts: ShaftDescription
    ,
    treadling: TreadlingDescription
    tieup:  [number[]]
    ,
    threads: null | number
}