//This is where the user can see and handle their drafts
import { AddDraft } from '@/app/components/(userpages)/profile/drafts/AddDraft'
import { UserDraftDisplay } from '@/app/components/(userpages)/profile/drafts/UserDraftDisplay'

export default function DraftPage() {
    return (
            <div className='profile-page' id='draft-page'>
                <UserDraftDisplay />
                <AddDraft/>
            </div>
    )
}