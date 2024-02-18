import { createClient, configureChains } from "wagmi";
import { bsc, bscTestnet } from "@wagmi/core/chains";
import { getDefaultProvider } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "@wagmi/core/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [bscTestnet],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [new InjectedConnector({ chains })],
});

export default client;
