//This component contains tye logic to sen POST, PUT, DELETE requests on single looms by a user
'use client'
import './editloomform.scss'

import { useState } from 'react'

import { Formsection } from '@/app/components/calculator/Formsection'
import { loomTypes } from '@/app/resources/constants/weaveDefaults'
import { useUserContext } from '@/app/resources/contexts/usercontext'


export function EditLoomForm(params: { loom: Loom }) {


    const { loom } = params
    const [editedLoom, setEditedLoom] = useState<Loom>({ ...loom })
    const loomId = loom.id
    //Is editing is initalized depending on if the lomm is represented in db(has an id), otherwise toggled on click
    const [isEditing, setisEditing] = useState<boolean>(loomId === undefined)
    const { user, updateLooms, removeLoom } = useUserContext()

    const startEdit = () => { setisEditing(true) }
    const endEdit = () => { setisEditing(false) }

    //Validation of the content in editedLoomState, is to be used before submission of data to DB
    function validateFormData() {
        let message = ''

        if (editedLoom.shafts < 2 || editedLoom.shafts > 36 || editedLoom.treadles < 2 || editedLoom.treadles > 36) { message = 'Please enter a number of shafts and treadles between 2 and 36.' }
        if (!loomTypes.includes(editedLoom.type)) { message = 'Please enter a valid type of loom' }
        if (editedLoom.brand.length > 25 || editedLoom.brand.length < 2) { message = 'Please enter a valid maker for your loom.' }

        if (message === '') {
            return true
        } else {
            alert(message)
            return false
        }
    }

    //Keeps the form and state values in sync for all loom properties
    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {

        let value: string | number = e.target.value
        
        e.target.type!=='number'? value = value : value = Number(value)
        setEditedLoom(prevValue => {
            const updatedValue = { ...prevValue, [e.target.id]: value }
            return updatedValue
        })
    }

    //Submitts edition to DB and updates LoomList in context
    async function editLoom(e: React.MouseEvent<HTMLElement>) {
        if (!validateFormData || loomId=== undefined) {
            return
        }

        const body = { values: { loom: editedLoom } }

        fetch(`/api/${user}/loom/${loomId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 200) {
                //TODO:Update loom in usderContext to match
                endEdit()
                updateLooms(loomId, editedLoom)
                alert('Loom updated!')
            } else {
                alert('Ops, the loom could not be updated')
            }
        })
    }

     //Posts Loom to DB and updates LoomList in context
    async function addLoom(e: React.MouseEvent<HTMLElement>) {
        if (!validateFormData) {
            return
        }

        const body = { values: { loom: editedLoom } }

        fetch(`/api/${user}/loom/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {

            if (response.status == 201) {
                //TODO:Update loom in usderContext to match
                endEdit()
                updateLooms(loomId, editedLoom)
                
                alert('Loom saved!')
            } else {
                alert('Ops, the loom could not be saved')
            }
        })
    }

    //Deletes loom from DB and updates loomlist in context
    function deleteLoom() {
        if(loomId===undefined){
            return
        }

        fetch(`/api/${user}/loom/${loomId}`, { method: 'DELETE' })
            .then(function (response) {

                if (response.status == 200) {
                    //TODO:Update loom in usderContext to match
                    removeLoom(loomId)
                    alert('Loom deleted!')
                } else {
                    alert('Ops, could not delete the loom')
                }
            })
    }
    //TODO:Disable and style inputs when not editing and add styling for non-valid values
    return (
        <>
            <form className={isEditing?'loom-form': 'view-only-form'} >
                <Formsection>
                    <label>Shafts:</label>
                    <input name="shafts" id="shafts" type='number' min='1' max='36' value={editedLoom.shafts.toString()} onChange={(e) => { onChangeHandler(e) }} disabled={!isEditing}>{ }</input>
                </Formsection>
                <Formsection>
                    <label>Treadles:</label>
                    <input name="treadles" id="treadles" type='number' min={1} max={36} value={editedLoom.treadles.toString()} onChange={(e) => { onChangeHandler(e) }} disabled={!isEditing}></input>
                </Formsection>
                <Formsection>
                    <label>Type:</label>
                    <select name="type" id="type" value={editedLoom.type.toString()} onChange={(e) => { onChangeHandler(e) }} disabled={!isEditing}>
                        <option value={''}></option>
                        {loomTypes.map(type => {
                            return (<option key={type} value={type}>{type}</option>)
                        })}
                    </select>
                </Formsection>
                <Formsection>
                    <label>Make:</label>
                    <input name="brand" id="brand" type='text' maxLength={25} size={15} value={editedLoom.brand.toString()} onChange={(e) => { onChangeHandler(e) }} disabled={!isEditing}></input>
                </Formsection>
            </form>
            <div className='action-container'>
                <>
                    {isEditing ? <><button type='button' onClick={loom.id == undefined ? addLoom : editLoom}>Save</button>{isEditing && loomId ? <button type='button' onClick={endEdit}>Stop Editing</button> : null}</> : <button type='button' onClick={startEdit}>Edit</button>}
                    <button className='icon-button' onClick={deleteLoom}>Delete</button>

                </>
            </div>
        </>
    )

}