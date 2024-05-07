//Information on reed as returned from the server
type Draft = {
    id:string|undefined,
    weave: WeaveObject,
    creationDate: DateString,
    updateDate: DateString,
    public: Boolean
}

type PublicDraft= {
    weave: WeaveObject,
}

type DateString=string

type DraftList=Draft[]

type PublicDraftList =PublicDraft[]