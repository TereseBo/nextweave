//This is where the user can see and handle their looms

import { AddReed } from '@/app/components/(userpages)/profile/reeds/AddReed'
import { UserReedDisplay } from '@/app/components/(userpages)/profile/reeds/UserReedDisplay'


export default function LoomPage() {
    return (
            <div id='profile-page'>
                <UserReedDisplay/>
                <AddReed/>
            </div>
    )
}