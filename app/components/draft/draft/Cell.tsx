//Component contains single cell for use in a grid,
//id consitutes the coordinates and color the value of the grid position

import './cell.scss';

import { ReactElement } from 'react';


export interface CellProps extends React.ReactElement {
    id: string;
    style:{
        backgroundColor:string|undefined
    }
  }

export function Cell(params: { color: color, id: string, }):ReactElement<CellProps> {
    
    const { color, id, } = params
    let css=color!=''?{ backgroundColor: color}:{}
    return <div className="cell" style={css} id = { id } ></div >
}