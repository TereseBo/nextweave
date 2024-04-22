'use-client'
//Component creates rows for each item in an array and supplies the item as contents to the row.
//The prop type is used to keep track of the parentgrid of downstream components
import './grid.scss';

import { ReactElement, SetStateAction, useContext } from 'react'

import { Row } from '@/app/components/draft/draft/Row'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'
import { WeaveContextType } from '@/app/resources/types/contexts'

import { updateGrid } from '../weaveGridHandler/updateGrid';
import { CellProps } from './Cell'

interface CellTarget extends EventTarget {
    id: string
}

interface Grid extends HTMLDivElement {
    type: string,
    props: object,
    key: any
}
export function Grid_contained(props: { content: grid, type: string, setContent: ((value: SetStateAction<grid>) => void) | null }): ReactElement<Grid> {

    const { currentColor } = useContext(WeaveContext) as WeaveContextType

    //On click, update backgroundcolor
    function clickhandlerWrapper(e: React.MouseEvent<CellProps>) {

        if (!setContent) {
            return
        }
        const cell = e.target as CellTarget
        setContent(prevValue => updateGrid(prevValue, cell.id, currentColor))
    }

    const { type, setContent, content } = props

    const gridRows = content.map((item, index) => {
        //TODO: Handle empty item.
        return <Row content={item} key={`${type}-row-${index}`} rownr={index} type={type} />
    })

    return <div className="grid" id={`${type}-wrapper`} onClick={(e) => { setContent != null && clickhandlerWrapper(e as React.MouseEvent<Grid>) }}>{gridRows}</div>
}
