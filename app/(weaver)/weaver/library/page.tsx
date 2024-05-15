'use client'
import './page.scss'

import { useEffect, useState } from 'react'

import { FilterDrafts } from '@/app/components/library/FilterDrafts'
import { PublicDraftCard } from '@/app/components/library/publicDraftCard'
import { Header } from '@/app/components/zSharedComponents/Header'

export default function LibraryPage() {

    const [publicDrafts, setPublicDrafts] = useState<PublicDraftList | null>(null)
    const [filteredDrafts, setFilteredDrafts] = useState<PublicDraftList | null>(null)

    //TODO: Add second state and components for filtering/sorting

    useEffect(() => {
        const getPublicDrafts = async () => {

            try {
                let response = await fetch('/api/public/drafts')

                if (response.status == 200) {

                    const body = await response.json();
                    const { publicDraftList } = body
                    setPublicDrafts(publicDraftList)
                    setFilteredDrafts(publicDraftList.sort((a: PublicDraft, b: PublicDraft) => {
                        if (!a.weave.shafts.count) {
                            a.weave.shafts.count = 0;
                        }
                        if (!b.weave.shafts.count) {
                            b.weave.shafts.count = 0;
                        }
                        return a.weave.shafts.count > b.weave.shafts.count
                    }
                    ).sort((a: PublicDraft, b: PublicDraft) => {
                        if (!a.weave.treadling.count) {
                            a.weave.treadling.count = 0;
                        }
                        if (!b.weave.treadling.count) {
                            b.weave.treadling.count = 0;
                        }
                        return a.weave.treadling.count > b.weave.treadling.count
                    })

                    )
                }
            } catch (error) {
                console.log(error)
            }
        }

        getPublicDrafts()

    }, [])



    return (
        <div id='library-page' className='page'>
            <Header title="You are in the library" text="Browse awailable drafts to be inspired" />

            {publicDrafts ?
                <div className='library-container'><FilterDrafts publicDrafts={publicDrafts} setPublicDrafts={setPublicDrafts} filteredDrafts={filteredDrafts} setFilteredDrafts={setFilteredDrafts} />
                    <div className='library-content'>
                        {publicDrafts.map((draft, index) => {
                            if (!draft) return (null)
                            else {
                                return (<PublicDraftCard key={index} draft={draft} />)
                            }
                        })}
                    </div></div> : <div>Loading drafts</div>}


            {publicDrafts && publicDrafts.length == 0 ?
                <div >
                    No public drafts to show
                </div> : null}

        </div>
    )
}