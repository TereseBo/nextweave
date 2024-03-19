import './dbsaveweave.scss'

import { useContext, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import { createWeaveObject } from '@/app/components/draft/filehandler/functions/get/createWeaveObject'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

export function DbSaveWeave() {
    const { treadleGrid, tieUpGrid, warpGrid } = useContext(WeaveContext) as WeaveContextType


    const [open, setIsOpen] = useState(false);
    const openForm = () => setIsOpen(true);
    const closeForm = () => setIsOpen(false);
    const { userId } = useAuth()

    async function saveWeave() {

        const weaveObject = createWeaveObject(warpGrid, treadleGrid, tieUpGrid)
        console.log(weaveObject)
        const body = { values: { weaveObject, name: 'Three' } }
        fetch(`/api/${userId}/draft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {
            console.log(response)
            if (response.status == 201) {
                console.log('sucsess', response)
            }
        })
    }

    return (
        <>
            <form className={open ? 'openForm' : 'hidden'} onMouseLeave={closeForm} >
                <label>Name your draft:</label><input type='text'></input>
                <button type='button' onClick={saveWeave}>Save</button>
            </form>
            <button className={open ? 'hidden' : ''} type='button' onClick={saveWeave} onMouseEnter={openForm}>Save</button>
        </>
    )

}