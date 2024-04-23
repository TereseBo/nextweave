import './reedimg.scss'

export function ReedImg(props: { reed: Reed }) {

    const { dents, section, unit } = props.reed
    
    let slitSize = 1 / (dents / section)
    let bar=0.2
    let repeats = 6/(bar+slitSize)
    
    repeats = repeats > 1 ? Math.floor(repeats) : Math.ceil(repeats)
    const keys = new Array(repeats).fill('')

    const slitComponets = keys.map((item, index) => {return <div key={index} className={`slit ${unit}`} style={{ width: `${slitSize}rem` }} />})

    return (

        <div className="reed-img" >
            <div className="slit-container" style={{ gap: `${bar}rem` }}>
                {slitComponets}
            </div>
        </div >
    )
}