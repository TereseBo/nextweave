import './aside.scss'

import Link from 'next/link'

export function Aside() {

    return (

        <nav className="side-bar">
            <Link href="/weaver/profile/drafts">Drafts</Link>
            <Link href="/weaver/profile/looms">Looms</Link>
            <Link href="/weaver/profile/reeds">Reeds</Link>
        </nav>
    )
}