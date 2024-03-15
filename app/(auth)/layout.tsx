//Shared layout, including header for auth related pages
import { Header } from '@/app/components/zSharedComponents/Header'

export default function AuthBaseLayout({
    children,
}: {
    children: React.ReactElement
}) {
    return (
        <>
            <main id='auth'>
                <Header title="Welcome to the weaving project creator!" text="A registered account will give you access to more features, but some functionality is also available without sign in. "></Header>
                {children}
            </main>
        </>
    )
}