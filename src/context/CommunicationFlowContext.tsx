// src/context/CommunicationFlowContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export interface ProviderType {
  id: string;
  name: string;
}

export interface HouseType {
  id: string;
  name: string;
}

interface CommunicationFlowContextData {
  provider: ProviderType | null;
  setProvider: (provider: ProviderType) => void;
  house: HouseType | null;
  setHouse: (house: HouseType) => void;
}

const CommunicationFlowContext = createContext<
  CommunicationFlowContextData | undefined
>(undefined);

export const CommunicationFlowProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [provider, setProvider] = useState<ProviderType | null>(null);
  const [house, setHouse] = useState<HouseType | null>(null);

  return (
    <CommunicationFlowContext.Provider
      value={{ provider, setProvider, house, setHouse }}
    >
      {children}
    </CommunicationFlowContext.Provider>
  );
};

export const useCommunicationFlow = () => {
  const context = useContext(CommunicationFlowContext);
  if (!context) {
    throw new Error(
      "useCommunicationFlow must be used inside the CommunicationFlowProvider"
    );
  }
  return context;
};
