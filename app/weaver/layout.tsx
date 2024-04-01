'use client'

export default function WeaverBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {
    return (
        <>
            <main>  {children}</main>
            <footer></footer>
        </>

    )
}
