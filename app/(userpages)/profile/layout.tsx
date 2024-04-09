//Contains common layout for userpages, including contextprovider for user-assets from DB
'use client'

import { useContext, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

import { UserContext } from '@/app/resources/contexts/usercontext'

export default function ProfileBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {
    const { setUser } = useContext(UserContext) as any

    const { userId } = useAuth()
    useEffect(() => {


        userId ? setUser(userId) : setUser(null)
    },)

    return (
        <>
            {children}

        </>
    )
}
