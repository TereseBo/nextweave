
import { UserProvider } from './usercontext';


export function UserProviderWrapper({ children }: { children: React.ReactElement  }) {

  return (
  
      <UserProvider >{children}</UserProvider>
      
  );
}