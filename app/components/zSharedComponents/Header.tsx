import './header.scss'

import Link from 'next/link'

export function Header(params:{title:string, text:string}){
    const {title, text}= params
    return(
        <header className="nav-container">
            <h1>{title}</h1>
            <p>{text}</p>
            <nav className="nav-bar">
                <Link href="/weaver/calculator">Calculator</Link>
                <Link href="/weaver">Settings</Link>
                <Link href="/weaver/draft">Draft</Link>

            </nav>
        </header>
    )

}