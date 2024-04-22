'use-client'
//Component creates rows for each item in an array and supplies the item as contents to the row.
//The prop type is used to keep track of the parentgrid of downstream components
import '@/app/components/draft/draft/grid.scss'

import { ReactElement, useContext } from 'react'

import { Row } from '@/app/components/draft/draft/Row'

interface Grid extends HTMLDivElement {
    type: string,
    props: object,
    key: any
}
export function PreviewGrid(props: { content: grid, type: string, }): ReactElement<Grid> {
   

    const { type, content } = props

    const gridRows = content.map((item, index) => {
       
        return <Row content={item} key={`${type}-row-${index}`} rownr={index} type={type} />
    })

    return <div className="grid" key={type}>{gridRows}</div>
}
