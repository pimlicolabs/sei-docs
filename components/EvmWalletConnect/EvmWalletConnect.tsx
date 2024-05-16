import {
    ConnectButton,
    connectorsForWallets,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { ChainRpcUrls } from "viem/_types/types/chain";

export default function EvmWalletConnect() {
    const rpcUrl: ChainRpcUrls = {
        http: ["https://evm-rpc.sei-apis.com"],
        webSocket: ["wss://evm-ws.sei-apis.com"],
    };
    const seiDevnet: Chain = {
        id: 513,
        name: "Sei Network",
        network: "Sei",
        nativeCurrency: {
            decimals: 18,
            name: "Sei",
            symbol: "SEI",
        },
        rpcUrls: {
            public: rpcUrl,
            default: rpcUrl,
        },
        testnet: true,
        blockExplorers: {
            default: { name: "Seitrace", url: "https://seitrace.com" },
        },
    };

    const { chains, publicClient } = configureChains(
        [seiDevnet],
        [publicProvider()]
    );

    // This needs to be updated
    const projectId = "???";
    const connectors = connectorsForWallets([
        {
            groupName: "Recommended",
            wallets: [
                injectedWallet({ chains }),
                metaMaskWallet({ projectId, chains }),
            ],
        },
    ]);

    const wagmiConfig = createConfig({
        autoConnect: false,
        connectors,
        publicClient,
    });

    return (
        <div className="my-4 flex justify-center">
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                    <ConnectButton
                        accountStatus="address"
                        chainStatus="icon"
                        showBalance={false}
                    />
                </RainbowKitProvider>
            </WagmiConfig>
        </div>
    );
}
