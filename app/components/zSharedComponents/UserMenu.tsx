'use client'
//Contains an optional nav-menu for signed in users, otherwise a link to sign in
import './userMenu.scss'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function UserMenu() {
    const { isSignedIn } = useAuth()
    const pathname = usePathname()

    return (
        <div className='usermenu-container'>

            {/* {isSignedIn ?  <Link className="icon" href={'/profile'}>Profile</Link>: (pathname !== '/sign-in' ? <Link className="icon" href="/sign-in">Sign in</Link> : null)} */}
            <SignedOut>
                {pathname !== '/sign-in' ? <SignInButton/>: null}
            </SignedOut>
            <SignedIn>
                <Link className="icon" href={'/profile'}>Profile</Link>< UserButton afterSignOutUrl='/weaver' />
            </SignedIn>

        </div>
    )
}