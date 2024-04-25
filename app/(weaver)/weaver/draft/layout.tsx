
export default function WeaverDraftLayout({
    children,
}: {
    children:  React.ReactNode
}) {
    return (
        <>
            <main>  {children}</main>
            <footer></footer>
        </>
    )
}