import { createContext, useContext, type ReactNode } from 'react';
import { rootStore, RootStore } from './rootStore';

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
