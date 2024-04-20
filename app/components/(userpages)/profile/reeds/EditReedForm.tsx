//This component contains tye logic to sen POST, PUT, DELETE requests on single reeds by a user
'use client'

import { useState } from 'react'

import { Formsection } from '@/app/components/calculator/Formsection'
import { reedUnits } from '@/app/resources/constants/weaveDefaults'
import { useUserContext } from '@/app/resources/contexts/usercontext'


export function EditReedForm(params: { reed: Reed }) {


    const { reed } = params
    const [editedReed, setEditedReed] = useState<Reed>({ ...reed })
    const reedId = reed.id
    //Is editing is initalized depending on if the reed is represented in db(has an id), otherwise toggled on click
    const [isEditing, setisEditing] = useState<boolean>(reedId === undefined)
    const { user } = useUserContext()

    const startEdit = () => { setisEditing(true) }
    const endEdit = () => { setisEditing(false) }

    //Validation of the content in editedReedState, is to be used before submission of data to DB
    function validateFormData() {
        let message = ''

        if (editedReed.dents < 1 || editedReed.dents > 100 ) { message = 'Please enter a number of dents between 1 and 100' }
        if (!reedUnits.includes(editedReed.unit)) { message = 'Please enter a valid unit for measuring the reed' }
        if (editedReed.dents > 100 || editedReed.dents  < 1) { message = 'Please enter a valid measurement for the number of dents' }

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
        isNaN(Number(e.target.value)) ? value = e.target.value : value = Number(e.target.value)
        setEditedReed(prevValue => {
            const updatedValue = { ...prevValue, [e.target.id]: value }
            return updatedValue
        })
    }

    //Submitts edition to DB and updates LoomList in context
    async function editReed(e: React.MouseEvent<HTMLElement>) {
        if (!validateFormData) {
            return
        }

        const body = { values: { reed: editedReed } }
        fetch(`/api/${user}/reed/${reedId}`, {
            method: reedId === undefined ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 200) {
                //TODO:Update reed in usderContext to match
                endEdit()
                alert('Reed updated!')
            } else {
                alert('Ops, the reed could not be updated')
            }
        })
    }

    //Deletes reed from DB and updates reedlist in context
    function deleteReed() {

        fetch(`/api/${user}/reed/${reedId}`, { method: 'DELETE' })
            .then(function (response) {

                if (response.status == 200) {
                    //TODO:Update reed in usderContext to match
                    alert('Reed deleted!')
                } else {
                    alert('Ops, could not delete the loom')
                }
            })
    }
    //TODO:Disable and style inputs when not editing and add styling for non-valid values
    return (
        <>
            <form className='reed-form'>
            <Formsection>
                <label>Reed:</label>
                <input  type="number" id="dents" name="dents" min="1" max="100" value={Number(editedReed.dents).toString()} onChange={(e) => onChangeHandler} />
                /
                <input  type="number" id="section" name="section" min="1" max="100" value={Number(editedReed.section).toString()} onChange={(e) => onChangeHandler} />
                <select name="unit" id="unit" value={editedReed.unit} onChange={(e) => { onChangeHandler(e) }}>
                        <option value={''}></option>
                        {reedUnits.map(type => {
                            return (<option key={type} value={type}>{type}</option>)
                        })}
                    </select>
            </Formsection>
                <Formsection>
                    <label>Length:</label>
                    <input name="length" id="length" type='number' min={1} max={400} value={editedReed.length} onChange={(e) => { onChangeHandler(e) }}></input>
                </Formsection>
            </form>
            <div className='action-container'>
                <>{isEditing ? <button type='button' onClick={editReed}>Save</button> : <button type='button' onClick={startEdit}>Edit</button>}
                    <button className='icon-button' onClick={deleteReed}>Delete</button></>
            </div>
        </>
    )

}