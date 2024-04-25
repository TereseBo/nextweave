//This component saves a draft to the DB

import { useAuth } from '@clerk/nextjs'

import { useWeaveContext } from '@/app/resources/contexts/weavecontext'
import { createWeaveObject } from '@/app/resources/functions/weaveObjHandling/createWeaveObj/createWeaveObject'

export function DbSaveWeave(props: { afterSave: (() => void) | null }) {
    const { treadleGrid, tieUpGrid, warpGrid } = useWeaveContext()
    const { afterSave } = props
    //TODO: Add validation to ensure empty draft is not saved

    const { userId } = useAuth()

    async function saveWeave() {

        const weaveObject = createWeaveObject(warpGrid, treadleGrid, tieUpGrid)

        const body = { values: { weaveObject } }
        fetch(`/api/${userId}/draft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 201) {
                if (afterSave) { afterSave() }
                alert('Draft saved!')
            } else {
                alert('Ops, the draft could not be saved')
            }
        })
    }

    return (
        <>
            <button type='button' onClick={saveWeave} >Save</button>
        </>
    )

}