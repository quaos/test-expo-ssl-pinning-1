import { appConfig } from "./app.config";

import type { PinningOptions } from "react-native-ssl-public-key-pinning";

export enum KeysetName {
    Correct = "correct",
    Incorrect = "incorrect",
}

const myDomainPlaceholder = "{{myDomain}}";
const incorrectKeys = [
    // TEST: Dummy key
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    // TEST: Dummy key
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=",
];

const pinningOptionsByKeysetMap: Record<KeysetName, PinningOptions> = {
    [KeysetName.Correct]: {
        [myDomainPlaceholder]: {
            includeSubdomains: true,
            publicKeyHashes: [
                // DigiCert TLS Hybrid ECC SHA384 2020 CA1 (exp Sun, 13 Apr 2031)
                "e0IRz5Tio3GA1Xs4fUVWmH1xHDiH2dMbVtCBSkOIdqM=",
                // DigiCert Global Root CA
                "r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=",
            ],
        },
    },
    [KeysetName.Incorrect]: {
        [myDomainPlaceholder]: {
            includeSubdomains: true,
            publicKeyHashes: incorrectKeys,
        },
    },
};

export const sslPinningConfig = {
    keyset: (process.env.EXPO_PUBLIC_SSL_PINNING_KEYSET?.toLowerCase() ??
        KeysetName.Correct) as KeysetName,
    getPinningOptions(): PinningOptions {
        const selectedOptions = pinningOptionsByKeysetMap[this.keyset];
        return Object.entries(selectedOptions).reduce(
            (prevValues, [key, domainOptions]) => ({
                ...prevValues,
                [key === myDomainPlaceholder ? appConfig.apiDomain : key]: domainOptions,
            }),
            {},
        );
    },
};
