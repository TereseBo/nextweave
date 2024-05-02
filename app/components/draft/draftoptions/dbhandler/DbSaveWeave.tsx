//This component saves a draft to the DB

import { useAuth } from '@clerk/nextjs'

import { useWeaveContext } from '@/app/resources/contexts/weavecontext'
import { isEmptyDraftData } from '@/app/resources/functions/gridHandling/gridUtils'
import { createWeaveObject } from '@/app/resources/functions/weaveObjHandling/createWeaveObj/createWeaveObject'


export function DbSaveWeave(props: { afterSave: (() => void) | null }) {
    const { treadleGrid, tieUpGrid, warpGrid } = useWeaveContext()
    const { afterSave } = props
    //TODO: Add validation to ensure empty draft is not saved

    const { userId } = useAuth()

    function validateGrids() {

        if (!treadleGrid || !warpGrid || !tieUpGrid) return false

        if (isEmptyDraftData({ treadleGrid, warpGrid, tieUpGrid })) {
            alert('Please fill the grid before saving your draft')
            return false
        }

        return true

    }

    async function saveWeave() {

        if (!validateGrids()) return

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