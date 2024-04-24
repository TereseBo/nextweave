//Contains common layout for userpages, including contextprovider for user-assets from DB
'use client'
import './layout.scss'

import { Aside } from '@/app/components/(userpages)/profile/aside'
import { UserPageHeader } from '@/app/components/(userpages)/profile/UserPageHeader'
import { UserProviderWrapper } from '@/app/resources/contexts/UserProviderWrapper'

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
                    <div className='userpages-layout'>
                        <Aside />
                        {children}
                    </div>
                    <footer></footer>
                </>
            </UserProviderWrapper>
        </>
    )
}
