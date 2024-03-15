import './row.scss'

import { Cell } from './Cell';
export function Row(props: { content: string[], type: string, rownr: number }) {

    const { type, rownr } = props

    const rowCells = props.content.map((item, index) => {
        //TODO: Handle empty item.
        return <Cell color={item} key={`${index}`} id={`${type}-${index}-${rownr}`} />
    })
    return <div className="row" id={`${type}-row-${rownr}`}>{rowCells} </div>
} 