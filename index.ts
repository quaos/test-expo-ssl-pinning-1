import { registerRootComponent } from "expo";
import { initializeSslPinning, isSslPinningAvailable } from "react-native-ssl-public-key-pinning";

import { App } from "./src/App";
import { sslPinningConfig } from "./src/config/sslPinning.config";
import { useAppInitializationStore } from "./src/store/appInitializationStore";

const initSslPinningAsync = async () => {
    try {
        // const [setIsSslPinningAvailable, setIsSslPinningReady] = useAppInitializationStore(
        //     ({ setIsSslPinningAvailable, setIsSslPinningReady }) => [
        //         setIsSslPinningAvailable,
        //         setIsSslPinningReady,
        //     ],
        // );
        const isAvailable = isSslPinningAvailable();
        useAppInitializationStore.setState({ isSslPinningAvailable: isAvailable });
        if (!isAvailable) {
            throw new Error("No SSL Pinning available!");
        }
        const sslPinningOptions = sslPinningConfig.getPinningOptions();
        console.debug(
            new Date().toISOString(),
            `${initSslPinningAsync.name}: sslPinningOptions:`,
            sslPinningOptions,
        );
        await initializeSslPinning(sslPinningOptions);
        useAppInitializationStore.setState({ isSslPinningReady: true });
    } catch (err) {
        console.error(new Date().toISOString(), `${initSslPinningAsync.name}:`, err);
    }
};
void initSslPinningAsync();

registerRootComponent(App);
