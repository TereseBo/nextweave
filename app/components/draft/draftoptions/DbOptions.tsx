import { DbLoadWeave } from '@/app/components/draft/dbhandler/DbLoadWeave'
import { DbSaveWeave } from '@/app/components/draft/dbhandler/DbSaveWeave'
export function DbOptions() {

    return (
        <>
            <DbSaveWeave />
            <DbLoadWeave />
        </>
    )
}