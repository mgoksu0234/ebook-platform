import { WagmiConfig, useAccount } from "wagmi";
import { Navigate } from "react-router-dom";

function ProtectRoute(props) {
  const { isConnected } = useAccount();
  return isConnected ? props.children : <Navigate to={"/login"} replace />;
}

export default ProtectRoute;
