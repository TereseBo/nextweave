import './previouscolor.scss'

import { Colorinput } from '@/app/components/zSharedComponents/Colorinput'

export function PreviousColor(props: { content: colorCollection, header: string, clickhandler:(e: React.MouseEvent<HTMLInputElement, MouseEvent>)=>void, changehandler:(e:React.ChangeEvent<HTMLInputElement> )=>void }) {
    
    const {content, header, clickhandler, changehandler}= props

    return (
       
        < div className = "previous-color" >
            <h5>{header}</h5>
            {content.map(color=>
                <Colorinput id={`${header.toLowerCase()}-${color}`} label={`${header.toLowerCase()}-color`} value={color} key={color} clickhandler={clickhandler} changehandler={changehandler} />)}
        </div >
)

}