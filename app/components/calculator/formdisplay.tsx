import './formdisplay.scss'
export function FormDisplay({ children,
}: {
    children: React.ReactNode;
}) {
    return (

        <div className="form-container">
            {children}
        </div>
    )
}