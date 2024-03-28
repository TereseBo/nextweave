//Contains common layout for userpages, including contextprovider for user-assets from DB
'use client'
import { UserPageHeader } from '@/app/components/(userpages)/profile/UserPageHeader'
import { UserProviderWrapper } from '@/app/resources/contexts/UserProviderWrapper'

export default function ProfileBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {
    return (
        <>
            <main>
                <UserPageHeader />
                <UserProviderWrapper>
                    {children}
                </UserProviderWrapper>
            </main>
            <footer></footer>
        </>

    )
}
