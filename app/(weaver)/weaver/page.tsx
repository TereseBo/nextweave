import { Preferences } from '@/app/components/weaver/Preferences'
import { Header } from '@/app/components/zSharedComponents/Header'
export default function WeaverPage() {
    return (
        <>

            <div>
                <Header title="Welcome to the weaving project creator!" text="Start by registering your loom information. If you already have go straight to draft."></Header>
                <Preferences/>
            </div>
        </>
    )
}