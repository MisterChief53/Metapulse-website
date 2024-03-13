import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'
import Home from "../src/app/page"

describe('Home', () => {
    it('renders Docs text', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.getByText('Docs') // ACT

        expect(myElem).toBeInTheDocument() // ASSERT
    })
    it('should contain the text "information"', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.getByText(/information/i) // ACT

        expect(myElem).toBeInTheDocument() // ASSERT
    })
})