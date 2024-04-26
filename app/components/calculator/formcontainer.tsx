import './formcontainer.scss'
export function FormContainer({ children,
}: {
    children: React.ReactNode;
}) {
    return (

        <div className="form-container">
            {children}
        </div>
    )
}