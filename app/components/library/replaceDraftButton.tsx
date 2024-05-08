'use client'

import { useRouter } from 'next/navigation'

import { useWeaveContext } from '@/app/resources/contexts/weavecontext'

export function ReplaceDraftButton(params:  { weave: WeaveObject } ){
    const { weave } = params
    const { upSetGrids } = useWeaveContext()

    const router = useRouter()

    function useDraft() {
        if (weave) {
            upSetGrids(weave)
            router.push('/weaver/draft')
        } else {
            alert('Ops, something went wrong, please try another one')
        }
    }

    return(
        <button type='button' onClick={useDraft}>Use</button>
    )

}