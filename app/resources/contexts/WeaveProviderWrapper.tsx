'use client';

import { WeaveProvider } from './weavecontext';

export function WeaveProviderWrapper({ children }: { children: React.ReactElement  }) {

  return (
    <main>
      <WeaveProvider>{children}</WeaveProvider>
      </main>
  );
}