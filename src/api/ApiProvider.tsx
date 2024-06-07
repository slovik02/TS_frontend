import { LibraryClient } from './library-client';
import { createContext, ReactNode, useContext } from 'react';

const ApiContext: React.Context<LibraryClient> = createContext(
  new LibraryClient(),
);

export default function ApiProvider({ children }: { children: ReactNode }) {
  const apiClient: LibraryClient = new LibraryClient();

  return (
    <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>
  );
}

export function useApi(): LibraryClient {
  return useContext(ApiContext);
}
