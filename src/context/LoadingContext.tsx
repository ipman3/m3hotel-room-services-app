import { createContext, useContext, useState } from "react";
import * as React from "react";
import LoadingComponent from "@/components/LoadingComponent.tsx";

interface LoadingContextType {
  isPressed?: boolean;
  setIsPressed: (isPressed: boolean) => void;
  message?: string;
  setMessage?: (message: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Loading...");
  const [isPressed, setIsPressed] = useState(false);

  React.useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ isPressed, setIsPressed, message, setMessage, setLoading, loading }}>
      {children}
      {loading && <LoadingComponent message={message} />}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
