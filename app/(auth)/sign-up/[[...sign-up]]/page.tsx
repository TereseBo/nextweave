//Page for sign-up, only containing content required for sign-up provided by clerk
import '@/app/(auth)/auth.scss'
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='signup_container'>
      <SignUp />
    </div>
  );
}
