'use client'
import { WeaveProviderWrapper } from '@/app/contexts/WeaveProviderWrapper'

export default function WeaverBaseLayout({
    children,
}: {
    children:  React.ReactElement 
}) {
    return (
        <>
            <main>  <WeaveProviderWrapper>{children}</WeaveProviderWrapper></main>
            <footer></footer>
        </>

    )
}
