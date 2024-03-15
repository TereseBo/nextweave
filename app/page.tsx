'use client'
import { Preferences } from '@/app/components/weaver/Preferences'
import { Header } from '@/app/components/zSharedComponents/Header'
import { WeaveProvider } from './contexts/weavecontext'
export default function WeaverPage() {
  return (
    <>

      <div>
        <WeaveProvider>
          <Header title="Welcome to the weaving project creator!" text="Start by registering your loom information. If you already have go straight to draft."></Header>
          <Preferences />
        </WeaveProvider>
      </div>
    </>
  )
}