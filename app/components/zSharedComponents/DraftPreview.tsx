//This component renders a small, non changeable, minidraft from a fullsize weaveobject
//The size of the rendered grid is as specified by x and y coordinates
import './draftpreview.scss';

import { PreviewGrid } from '@/app/components/zSharedComponents/PreviewGrid'
import { defaultDraftHeight, defaultDraftWidth } from '@/app/resources/constants/weaveDefaults'
import { resizeGrid } from '@/app/resources/functions/gridHandling/resizeGrid'
import { readWeaveObject } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/readWeaveObject'
import { createWeave } from '@/app/resources/functions/weaveObjHandling/readWeaveObj/writeDraftGrid'

export function DraftPreview(params: { weaveObj: WeaveObject, x:number, y:number }) {

  let { x, y } = params

  const  weave  = params.weaveObj
  const gridSet = readWeaveObject(weave)
  const weaveGrid = createWeave(gridSet, defaultDraftHeight, defaultDraftWidth)

  const trimmedWeave = resizeGrid(weaveGrid, y, x)


  return (
    <div className="preview-container">
      <PreviewGrid content={trimmedWeave} type='preview' />
    </div>
  )

}