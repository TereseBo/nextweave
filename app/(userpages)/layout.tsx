//Contains common layout for userpages, including contextprovider for user-assets from DB
'use client'
import './layout.scss'

import { useContext } from 'react'
import { useAuth } from '@clerk/nextjs'

import { UserPageHeader } from '@/app/components/(userpages)/profile/UserPageHeader'

import { Aside } from '../components/(userpages)/profile/aside'
import { UserContext } from '../resources/contexts/usercontext'
import { UserProviderWrapper } from '../resources/contexts/UserProviderWrapper'

export default function ProfileBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {

    return (
        <>
            <UserProviderWrapper>
                <>
                    <UserPageHeader />
                    <main className='userpages-layout'>
                        <Aside />
                        {children}
                    </main>
                    <footer></footer>
                </>
            </UserProviderWrapper>
        </>
    )
}
