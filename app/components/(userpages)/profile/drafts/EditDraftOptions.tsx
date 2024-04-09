import { DraftHeader } from './DraftHeader';


export function EditDraftOptions(){
    return(
        <div>
        <DraftHeader text={`You are now editing draft ${'hrj'}`}/>
       <button>Update</button>
       <button>Save as new</button>
        </div>
    )
}