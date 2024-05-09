import './tooltip.scss'

export function Tooltip(params: { text: string }) {
    const { text } = params

    return (
        <div className='tool-tip'>
            {text}
        </div>
    )
}