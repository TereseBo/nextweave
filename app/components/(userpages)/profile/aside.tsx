import './aside.scss'

import Link from 'next/link'

export function Aside() {

    return (

        <nav className="side-bar">
            <Link href="/(userpages)/profile/drafts">Drafts</Link>
            <Link href="/(userpages)/profile/looms">Looms</Link>
            <Link href="/(userpages)/profile/reeds">Reeds</Link>
        </nav>
    )
}