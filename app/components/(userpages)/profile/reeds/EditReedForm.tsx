//This component contains tye logic to sen POST, PUT, DELETE requests on single reeds by a user
'use client'

import { useState } from 'react'

import { Formsection } from '@/app/components/calculator/Formsection'
import { reedUnits } from '@/app/resources/constants/weaveDefaults'
import { useUserContext } from '@/app/resources/contexts/usercontext'

export function EditReedForm(params: { reed: Reed, closeForm: (() => void) | null }) {

    const { reed, closeForm } = params
    const [editedReed, setEditedReed] = useState<Reed>({ ...reed })
    const reedId = reed.id
    //Is editing is initalized depending on if the reed is represented in db(has an id), otherwise toggled on click
    const [isEditing, setisEditing] = useState<boolean>(reedId === undefined)
    const { user, updateReeds, removeReed } = useUserContext()

    const startEdit = () => { setisEditing(true) }
    const endEdit = () => { setisEditing(false) }

    //Validation of the content in editedReedState, is to be used before submission of data to DB
    function validateFormData() {
        let message = ''

        if (editedReed.dents < 1 || editedReed.dents > 100) { message = 'Please enter a number of dents between 1 and 100' }
        if (!reedUnits.includes(editedReed.unit)) { message = 'Please enter a valid unit for measuring the reed' }
        if (editedReed.dents > 100 || editedReed.dents < 1) { message = 'Please enter a valid measurement for the number of dents' }

        if (message === '') {
            return true
        } else {
            alert(message)
            return false
        }
    }

    //Keeps the form and state values in sync for all reed properties
    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target)
        console.log(e.target.value)
        let value: string | number = e.target.value
        console.log(editedReed)
        e.target.type !== 'number' ? value = value : value = Number(value)
        setEditedReed(prevValue => {
            const updatedValue = { ...prevValue, [e.target.id]: value }
            return updatedValue
        })
    }

    //Submitts edition to DB and updates ReedList in context
    async function editReed(e: React.MouseEvent<HTMLElement>) {
        if (!validateFormData || reedId === undefined) {
            return
        }

        const body = { values: { reed: editedReed } }
        fetch(`/api/${user}/reed/${reedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 200) {
                endEdit()
                updateReeds(reedId, editedReed)
                if (closeForm) {
                    closeForm
                }
                alert('Reed updated!')
            } else {
                alert('Ops, the reed could not be updated')
            }
        })
    }
    //Posts Reed to DB and updates ReedList in context
    async function addReed(e: React.MouseEvent<HTMLElement>) {
        if (!validateFormData) {
            return
        }

        const body = { values: { reed: editedReed } }

        fetch(`/api/${user}/reed/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 201) {
                setEditedReed({ ...reed })
                updateReeds(reedId, editedReed)
                if (closeForm) {
                    closeForm()
                }

                alert('Reed saved!')
            } else {
                alert('Ops, the reed could not be saved')
            }
        })
    }
    //Deletes reed from DB and updates reedlist in context
    function deleteReed() {

        if (reedId === undefined) {
            return
        }

        fetch(`/api/${user}/reed/${reedId}`, { method: 'DELETE' })
            .then(function (response) {

                if (response.status == 200) {
                    //TODO:Update reed in usderContext to match
                    removeReed(reedId)
                    alert('Reed deleted!')
                } else {
                    alert('Ops, could not delete the reed')
                }
            })
    }
    //TODO:Disable and style inputs when not editing and add styling for non-valid values
    return (
        <>
            <form className={isEditing ? 'reed-form' : 'view-only-form'}>
                <Formsection>
                    <label>Reed:</label>
                    <input type="number" id="dents" name="dents" min="1" max="100" value={editedReed.dents.toString()} onChange={(e) => onChangeHandler(e)} disabled={!isEditing} />
                    /
                    <input type="number" id="section" name="section" min="1" max="100" value={editedReed.section.toString()} onChange={(e) => onChangeHandler(e)} disabled={!isEditing} />
                    <select name="unit" id="unit" value={editedReed.unit.toString()} onChange={(e) => { onChangeHandler(e) }} disabled={!isEditing}>
                        <option value={''}></option>
                        {reedUnits.map(type => {
                            return (<option key={type} value={type}>{type}</option>)
                        })}
                    </select>
                </Formsection>
                <Formsection>
                    <label>Length:</label>
                    <input name="length" id="length" type='number' min={1} max={400} value={editedReed.length.toString()} onChange={(e) => { onChangeHandler(e) }} disabled={!isEditing}></input>
                </Formsection>
            </form>
            <div className='action-container'>
                <>
                    {isEditing ? <button type='button' onClick={reed.id == undefined ? addReed : editReed}>Save</button> : null}
                    {!isEditing && reedId ? <button type='button' onClick={startEdit}>Edit</button> : null}
                    {reedId ? <button className='icon-button' onClick={deleteReed}>Delete</button> : null}
                    {isEditing && reedId ? <><button type='button' onClick={endEdit}>Lock</button> </> : null}
                    {closeForm ? <button className='icon-button' onClick={closeForm}>Close</button> : null}
                </>
            </div>
        </>
    )

}