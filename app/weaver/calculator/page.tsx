import './page.scss'

import { Warplengthform } from '@/app/components/calculator/Warplengthform'
import { Warpwidthform } from '@/app/components/calculator/Warpwidthform'
import { Header } from '@/app/components/zSharedComponents/Header'
export default function CalculatorPage() {
    return (
        <div id='calculator-page'>
            <Header title="Welcome to the calculator!" text="Start to fill in the form and it will update as you write." />
            <div className="calc-container">
            <Warplengthform/>
            <Warpwidthform/>
            </div>
        </div>
    )
}