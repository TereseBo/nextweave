//This is where the user can see and handle looms

import { AddLoom } from '@/app/components/(userpages)/profile/looms/AddLoom'
import { UserLoomDisplay } from '@/app/components/(userpages)/profile/looms/UserLoomDisplay'


export default function LoomPage() {
    return (
            <div id='profile-page'>
                <UserLoomDisplay/>
                <AddLoom/>
            </div>
    )
}