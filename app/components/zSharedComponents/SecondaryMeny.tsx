//An optional second meny which is used to provide page specific contents options
import './SecondaryMenu.scss'

export function SecondaryMenu({ children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="secondary-menu">
            {children}
        </div>
    )
}