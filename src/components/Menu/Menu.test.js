import {render, screen} from '@testing-library/react'
import Menu from './Menu'
import { MemoryRouter } from 'react-router-dom'
import AuthContext from '../../context/authContext'


test('render login if user is null', () =>{
    render(<MemoryRouter>
        <Menu/>
        </MemoryRouter>)
    const link = screen.getByText(/login/i)
    expect(link).toBeInTheDocument();
})

test('render logout if user exists', () =>{
    render(<AuthContext.Provider value={{
    user: {email: 'testemail@email.com'},
    login: () => {},
    logout: () => {},
    }}>
    <MemoryRouter>
        <Menu/>
        </MemoryRouter>
        </AuthContext.Provider>)
    const link = screen.getByText(/logout/i)
    expect(link).toBeInTheDocument();
})