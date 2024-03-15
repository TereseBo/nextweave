'use client'

//Colorinput which can handle both on click and change 
export function Colorinput(params:{id:string, label:string, value:color, clickhandler:undefined|((e:React.MouseEvent<HTMLInputElement>)=>void), changehandler:(e:React.ChangeEvent<HTMLInputElement>)=>void}){
    const {id, label, value, clickhandler, changehandler}=params
    
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id}  type="color" value={value} onChange={(e)=>{changehandler(e)}} onClick={(e)=>{{clickhandler && clickhandler(e)}}} />
        </>
    )
}