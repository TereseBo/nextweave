//Contains a nav-menu for userpages 
import './userpageheader.scss'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'


export function UserPageHeader() {

    return (
        <header className="nav-container">

            <div className='top-box'>
                <div className='userpagemenu-container'>

                    <Link className='icon-button' href={'/weaver'}>
                        <svg className='back_arrow_icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                        </svg>
                        <p>Back to weaver</p>
                    </Link>
                    < UserButton afterSignOutUrl='/weaver' />
                </div>
            </div>
            <div>
                <h1>Welcome to your profile</h1>
                <p>Here you can keep track of all your drafts, looms and reeds</p>
            </div>

        </header>






    )
}