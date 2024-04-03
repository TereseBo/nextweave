//This is a placeholder for the profile page
import { ObjectId } from 'mongodb'

import { EditDraftForm } from '@/app/components/(userpages)/EditDraftForm'
import { UserDraftDisplay } from '@/app/components/(userpages)/profile/UserDraftDisplay'
const testDraft = {
    _id: '660962082a3f5f2ded609f35',
    userId: 'user_2dii9L385rba2mMqfGHkO39xFDU',
    name: 'Three',
    weave: {
        shafts: [],
        treadling: [],
        tieup: [],
        threads: null
    },
    created: 'Sun Mar 31 2024',
    updated: 'Sun Mar 31 2024',
    public: false
}

export default function ProfilePage() {
    return (
        <>

            <div id='profile-page'>
                <h4>BELOW IS THE DRAFT DISPLAY</h4>
                <UserDraftDisplay />
                <EditDraftForm resource={testDraft} />
            </div>
        </>
    )
}