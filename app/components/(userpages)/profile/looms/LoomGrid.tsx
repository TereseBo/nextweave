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
            let bob = i + 1

            //ESpecifically handles small grids 
            if (treadles < 3) {
                bob = i
            }

            //Handles when shafts are more or equal to treadles
            for (let j = i; j <= bob; j++) {

                if (j >= treadles) {
                    const currentRowColoredIndex = imageGrid[i].findIndex((color) => color != '')
                    const previourRowColoredIndex = imageGrid[i - 1].findIndex((color) => color != '')
                    console.log(currentRowColoredIndex)
                    console.log(previourRowColoredIndex)
                    currentRowColoredIndex == -1 && previourRowColoredIndex == 0 ? j = 1 : j = 0

                    bob = 0

                }
                if (j < treadles) {
                    imageGrid[i][j] = defaultColor
                }

            }

            //Handles when treadles are more than shafts
            if (shafts < treadles) {
                bob = shafts + i + 1
                const start = shafts + i + 1
                for (let k = shafts + i + 1; k < treadles ; k++) {

                    if (k < treadles) {
                        const currentRowColoredIndex = imageGrid[i].findLastIndex((color) => color != '')
                        const previourRowColoredIndex = i > 0 ? imageGrid[i - 1].findLastIndex((color) => color != '') : imageGrid[shafts - 1].findLastIndex((color) => color)
                        console.log(currentRowColoredIndex)
                        console.log(previourRowColoredIndex)
                        previourRowColoredIndex == k ? imageGrid[i][k + 1] = defaultColor : imageGrid[i][k] = defaultColor

                    }
                    k = k + shafts -1

                }
            }


        }


        setContent(imageGrid)
        console.log('running grid useefect')

    }, [treadles, shafts])


    return (
        <>
            {
                (content != null) ?
                    <Grid_contained content={content} setContent={null} type='tie-up' /> : null
            }
        </>
    )
}