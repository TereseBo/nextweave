//This is where the user can see and handle their drafts

import { UserDraftDisplay } from '@/app/components/(userpages)/profile/drafts/UserDraftDisplay'

export default function DraftPage() {
    return (
            <div id='profile-page'>
                <UserDraftDisplay />
            </div>
    )
}