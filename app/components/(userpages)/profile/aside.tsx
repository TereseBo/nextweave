import './aside.scss'

import Link from 'next/link'

export function Aside() {

    return (

        <nav className="side-bar">
            <Link href="/profile/drafts">Drafts</Link>
            <Link href="/profile/looms">Looms</Link>
            <Link href="/profile/reeds">Reeds</Link>
        </nav>
    )
}