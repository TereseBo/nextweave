'use-client'
//Component creates rows for each item in an array and supplies the item as contents to the row.
//The prop type is used to keep track of the parentgrid of downstream components
import './grid.scss';

import { ReactElement, useContext } from 'react'

import { Row } from '@/app/components/draft/draft/Row'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

import { CellProps } from './Cell'

interface CellTarget extends EventTarget {
    id: string
}

interface Grid extends HTMLDivElement {
    type: string,
    props: object,
    key: any
}
export function Grid(props: { content: grid, type: string, }): ReactElement<Grid> {
    const { updateCell } = useContext(WeaveContext) as WeaveContextType

    //On click, update backgroundcolor
    function clickhandler(e: React.MouseEvent<CellProps>) {
        const cell = e.target as CellTarget
        updateCell(cell.id)
    }

    const { type, content } = props

    const gridRows = content.map((item, index) => {
        //TODO: Handle empty item.
        return <Row content={item} key={`${type}-row-${index}`} rownr={index} type={type} />
    })

    return <div className="grid" key={type} id={`${type}-wrapper`} onClick={(e) => { type != 'weave' && clickhandler(e as React.MouseEvent<Grid>) }}>{gridRows}</div>
}
