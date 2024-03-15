//Component for rendering a colorlist which the user can annotate
import './Yarnlist.scss'

import { Cell } from '../draft/Cell'

export function Yarnlist(params: { content: colorCollection, heading: string }) {
    const { content, heading } = params
    const colorList = content.map(color => {
        return <div className='yarn-container' key={`${color}`}><Cell color={color} id={`${heading}-${color}`} /> <input type='text' placeholder='Yarn description'></input></div>
    })
    return (
        <div id="warp-list" className="yarn-list">
            <form className=''>
            <h3 className="form-header">{heading}</h3>
            {(colorList.length>0)?(colorList):(<div>No {`${heading.toLowerCase()}`} in the draft</div>)}
            </form>
        </div>
    )
}