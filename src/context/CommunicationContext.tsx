import {CommunicationContextData} from '../@types/communication';
import {createContext, useContext} from 'react';
import useCommunicationRequests from '../hooks/useCommunicationRequests';

const CommunicationContext = createContext<
  CommunicationContextData | undefined
>(undefined);

const CommunicationContextProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const houseId = localStorage.getItem('houseId') || '';
  const {
    isPending: isLoading,
    error,
    data: items,
  } = useCommunicationRequests(houseId);
  return (
    <CommunicationContext.Provider
      value={{
        communications: items || [],
        isLoading,
        error,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  );
};

export default CommunicationContextProvider;

export const useCommunicationContext = () => {
  const context = useContext(CommunicationContext);
  if (context === undefined) {
    throw new Error(
      'useCommunicationContext precisa ser usado dentro de um CommunicationContextProvider',
    );
  }
  return context;
};
