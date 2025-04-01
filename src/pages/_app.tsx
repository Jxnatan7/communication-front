import AuthProvider from "@/context/AuthContext";
import { CommunicationFlowProvider } from "@/context/CommunicationFlowContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CommunicationFlowProvider>
        <Component {...pageProps} />
      </CommunicationFlowProvider>
    </AuthProvider>
  );
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
