//Contains tests of calculator page content
import { render, screen } from '@testing-library/react'

import Page from '@/app/weaver/calculator/page'

import '@testing-library/jest-dom'

//Tests for header contents
describe('Calculator page header', () => {

    it('renders a banner', () => {
        render(<Page />)

        const header = screen.getByRole('banner', {})
        expect(header).toBeInTheDocument()
    })

    it('renders a heading', () => {
        render(<Page />)

        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
        expect(heading.textContent).toMatch('Welcome to the')
    })

    it('renders a navbar', () => {
        render(<Page />)

        const navbar = screen.getByRole('navigation', {})
        expect(navbar).toBeInTheDocument()
    })
})

//Tests for prescence of ecxpected contents 
describe('Calculator page content', () => {
    //Tests for main contents in page
    it('renders a correct number of forms', () => {
        render(<Page />)

        const forms = screen.getAllByRole('form')
        expect(forms.length).toBe(2)
    })
})