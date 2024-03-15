import { render, screen } from '@testing-library/react'

import { Warpwidthform } from '@/app/components/calculator/Warpwidthform'

import '@testing-library/jest-dom'
//TODO: Add tests for formfunction
//Tests for warpwidth form contents 

describe('Renders form', () => {

    //TODO:Add expected data

    it('renders the form', () => {
        render(<Warpwidthform />)

        const form = screen.getAllByRole('form')
        expect(form.length).toBe(1)
        expect(form[0]).toBeInTheDocument()
    })


    it('renders expected input', () => {
        render(<Warpwidthform />)

        const inputs: HTMLInputElement[] = screen.getAllByRole('spinbutton', {})
        expect(inputs.length).toBe(8)

        //TODO: Add check of values

    })

    
})

//Tests for interactions with form
/* describe('content', () => {
    
    it('', () => {
  */