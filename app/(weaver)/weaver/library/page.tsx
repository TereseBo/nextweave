import './page.scss'

import * as library from '@/app/api/public/drafts/route'
import { FormDisplay } from '@/app/components/calculator/formdisplay'
import { PublicDraftCard } from '@/app/components/library/publicDraftCard'
import { Header } from '@/app/components/zSharedComponents/Header'

export default async function LibraryPage() {

    const getPublicDrafts = async () => {
        try {
            let response = await library.GET(null)

            if (response.status == 200) {

                const body = await response.json();
                const { publicDraftList } = body
                return publicDraftList
            }
        } catch (error) {
            return []
        }
    }

    const publicDrafts: PublicDraftList = await getPublicDrafts()

    return (
        <div id='library-page'>
            <Header title="You are in the library" text="Browse awailable drafts to be inspired" />

                {publicDrafts ?
                    <div className='library-content'>
                        {publicDrafts.map((draft, index) => {
                            if (!draft) return (null)
                            else {
                                return (<PublicDraftCard key={index} draft={draft} />)
                            }
                        })}
                    </div> : <div>Loading drafts</div>}


                {publicDrafts && publicDrafts.length == 0 ?
                    <div >
                        No public drafts to show
                    </div> : null}

        </div>
    )
}