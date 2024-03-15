//Contains main nav visible on all pages, content vary depending on page and sign-in status
import './header.scss'

import Link from 'next/link'

import { UserMenu } from './UserMenu'

export function Header(params: { title: string, text: string }) {

    const { title, text } = params
    return (
        <header className="nav-container">

            <div className='top-box'>
                <UserMenu />
            </div>
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>

            <nav className="nav-bar">
                <Link href="/weaver/calculator">Calculator</Link>
                <Link href="/weaver">Settings</Link>
                <Link href="/weaver/draft">Draft</Link>
            </nav>
        </header>
    )
}