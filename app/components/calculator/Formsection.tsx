import './formsection.scss'

import { ReactElement } from 'react'
export function Formsection({
    children,
  }: {
    children: React.ReactNode
  }) {
  
   
    return (
        <div className="formsection">
            {children}
        </div>

    )}