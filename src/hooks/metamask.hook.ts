import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useRef, useState } from "react";
import Web3 from "web3";

export enum StatusDefault {
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
  LOADING = "loading",
}

export interface StatusReturns {
  status: StatusDefault;
  message?: string;
  solution?: string;
}

interface UseMetamask {
  detectMetamask: boolean;
  connectMetamask: () => Promise<StatusReturns>;
  walletId?: string;
  walletIdShrunk?: string;
  metamaskIsConnected: () => boolean;
}

export const useMetamask = (): UseMetamask => {
  const [detectMetamask, setDetectMetamask] = useState<boolean>(false);
  const [walletId, setWalletId] = useState<string>();

  const ethereum = useRef<MetaMaskInpageProvider | null>(
    (window.ethereum as MetaMaskInpageProvider) || null
  );

  const switchNetwork = async (): Promise<unknown> => {
    const chainId = Web3.utils.toHex(Number(process.env.REACT_APP_CHAIN_ID));
    return await ethereum.current?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  };

  const connectMetamask = async (): Promise<StatusReturns> => {
    const provider = await detectEthereumProvider();

    if (provider) {
      setDetectMetamask(true);

      const validNetwork =
        (await switchNetwork().catch(({ message }) => ({
          status: StatusDefault.ERROR,
          message,
        }))) === null;

      const connectResponse = await ethereum.current
        ?.request<string[]>({
          method: "eth_requestAccounts",
        })
        .catch(({ message }) => ({
          status: StatusDefault.ERROR,
          message: message,
          solution: "Please, contact our support.",
        }));

      // Pegar a wallet ID do usuario assim que ele estiver conectado
      const currentWallet =
        typeof connectResponse === "string"
          ? connectResponse
          : (connectResponse as string[]).shift();
      setWalletId(currentWallet);

      return {
        status: StatusDefault.SUCCESS,
        message: "Metamask is connected",
      };
    } else {
      return {
        status: StatusDefault.ERROR,
        message: "Metamask Not Found",
        solution:
          "Please, install the MetaMask chrome extension and try again.",
      };
    }
  };

  const walletIdShrunk: string =
    walletId?.substring(0, 6) +
    "..." +
    walletId?.substring(walletId?.length - 6);

  const metamaskIsConnected = (): boolean =>
    detectMetamask && walletId ? true : false;

  return {
    detectMetamask,
    connectMetamask,
    walletId,
    walletIdShrunk,
    metamaskIsConnected,
  };
};
