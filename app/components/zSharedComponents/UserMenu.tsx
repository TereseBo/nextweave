'use client'
//Contains an optional nav-menu for signed in users, otherwise a link to sign in
import './userMenu.scss'

import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function UserMenu() {
    const { isSignedIn } = useAuth()
    const pathname = usePathname()
    //TODO:Readd profile button when page has been implemented
    {/* <Link className="icon" href={'/profile'}>Profile</Link> */}
    return (
        <div className='usermenu-container'>
            
            {isSignedIn ?  null: (pathname !== '/sign-in' ? <Link className="icon" href="/sign-in">Sign in</Link> : null)}
            
            < UserButton afterSignOutUrl='/weaver' />
        </div>
    )
}