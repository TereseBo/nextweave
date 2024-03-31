//Contains common layout for userpages, including contextprovider for user-assets from DB
'use client'
import './layout.scss'
import { UserPageHeader } from '@/app/components/(userpages)/profile/UserPageHeader'
import { Aside } from '../components/(userpages)/profile/aside'

export default function ProfileBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {
    return (
        <>
            <UserPageHeader />
            <main className='userpages-layout'>
                <Aside />
                {children}
            </main>
            <footer></footer>
        </>
    )
}
