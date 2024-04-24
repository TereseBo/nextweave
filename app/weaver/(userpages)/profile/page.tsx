//This is where the user can see and handle their drafts
import { redirect } from 'next/navigation'

export default function ProfilePage() {
    redirect('/weaver/profile/drafts')
}