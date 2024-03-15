export function TextButton(params:{onClick:()=>void, text:string}){
    const { text, onClick}= params
return(
    <button onClick={onClick}>{text}</button>
)
}