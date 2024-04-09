'use client'

export default function WeaverBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {
    return (
        <>
            {children}
            <footer></footer>
        </>

    )
}
