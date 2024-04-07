//This is where the user can see and handle their drafts

import { UserDraftDisplay } from '@/app/components/(userpages)/profile/UserDraftDisplay'

export default function ProfilePage() {
    return (
        <>
            <div id='profile-page'>
                <UserDraftDisplay />
            </div>
        </>
    )
}