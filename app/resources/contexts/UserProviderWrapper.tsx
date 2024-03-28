
import { UserProvider } from './usercontext';

export function UserProviderWrapper({ children }: { children: React.ReactElement  }) {

  return (
    <main>
      <UserProvider >{children}</UserProvider>
      </main>
  );
}