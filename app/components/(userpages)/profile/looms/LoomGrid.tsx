//Component to generate a tieUp grid  from shaft and treadle data for a lom(for visual purposes)
import { useEffect, useState } from 'react'

import { Grid_contained } from '@/app/components/draft/draft/Grid_contained'
import { createGrid } from '@/app/components/draft/weaveObjHandler/utils'
import { defaultColor } from '@/app/resources/constants/weaveDefaults'
export function LoomGrid(props: { shafts: number, treadles: number }) {

    const { shafts, treadles } = props
    const [content, setContent] = useState<grid>(createGrid(treadles, shafts))

    useEffect(() => {
        const imageGrid = createGrid(treadles, shafts)

        for (let i = 0; i < shafts; i++) {
            let fillEnd = i + 1

            //Specifically handles small grids 
            if (treadles < 3) {
                fillEnd = i
            }

            //Handles when shafts are more or equal to treadles
            for (let j = i; j <= fillEnd; j++) {

                if (j >= treadles) {
                    const currentRowColoredIndex = imageGrid[i].findIndex((color) => color != '')
                    const previourRowColoredIndex = imageGrid[i - 1].findIndex((color) => color != '')
                    currentRowColoredIndex == -1 && previourRowColoredIndex == 0 ? j = 1 : j = 0

                    fillEnd = 0
                }
                if (j < treadles) {
                    imageGrid[i][j] = defaultColor
                }
            }

            //Handles when treadles are more than shafts
            if (shafts < treadles) {
                const start = shafts + i + 1
                for (let k = start; k < treadles; k++) {

                    if (k < treadles) {
                        const previourRowColoredIndex = i > 0 ? imageGrid[i - 1].findLastIndex((color) => color != '') : imageGrid[shafts - 1].findLastIndex((color) => color)
                        previourRowColoredIndex == k ? imageGrid[i][k + 1] = defaultColor : imageGrid[i][k] = defaultColor
                    }
                    k = k + shafts - 1
                }
            }
        }
        setContent(imageGrid)

    }, [treadles, shafts])

    return (
        <div className='preview-container'>
            {
                (content != null) ?
                    <Grid_contained content={content} setContent={null} type='tie-up' /> : null
            }
        </div>
    )
}