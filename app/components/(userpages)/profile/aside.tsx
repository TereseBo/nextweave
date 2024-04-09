import './aside.scss'

import Link from 'next/link'

export function Aside() {

    return (

        <nav className="side-bar">
            <Link href="/(userpages)/profile">Drafts</Link>
            <Link href="/(userpages)/looms">Looms</Link>
            <Link href="/(userpages)/reeds">Reeds</Link>
        </nav>
    )
}