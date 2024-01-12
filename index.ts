import { registerRootComponent } from "expo";
import { initializeSslPinning, isSslPinningAvailable } from "react-native-ssl-public-key-pinning";

import { App } from "./src/App";
import { sslPinningConfig } from "./src/config/sslPinning.config";

const initSslPinningAsync = async () => {
    try {
        if (!isSslPinningAvailable()) {
            throw new Error("No SSL Pinning available!");
        }
        const sslPinningOptions = sslPinningConfig.getPinningOptions();
        console.debug(
            new Date().toISOString(),
            `${initSslPinningAsync.name}: sslPinningOptions:`,
            sslPinningOptions,
        );
        await initializeSslPinning(sslPinningOptions);
    } catch (err) {
        console.error(new Date().toISOString(), err);
    }
};
void initSslPinningAsync();

registerRootComponent(App);
