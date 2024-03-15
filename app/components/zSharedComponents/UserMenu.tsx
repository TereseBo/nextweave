//Contains an optional nav-menu for signed in users, otherwise a link to sign in
import './userMenu.scss'

import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
import Link from 'next/link'

export function UserMenu() {
    const { userId } = auth();

    return (
        <div className='usermenu-container'>
            {userId ? <Link className="icon" href={`/${userId}`}>Profile</Link> : <Link className="icon" href="/sign-in">Sign in</Link>}
            < UserButton />
        </div>
    )
}