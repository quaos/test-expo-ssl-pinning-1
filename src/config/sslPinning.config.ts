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
                // DigiCert Global G2 TLS RSA SHA256 2020 CA1 (exp Sat, 29 Mar 2031)
                "Wec45nQiFwKvHtuHxSAMGkt19k+uPSw9JlEkxhvYPHk=",
                // // DigiCert TLS Hybrid ECC SHA384 2020 CA1 (exp Sun, 13 Apr 2031)
                // "e0IRz5Tio3GA1Xs4fUVWmH1xHDiH2dMbVtCBSkOIdqM=",
                // DigiCert Global Root CA
                "r/mIkG3eEpVdm+u/ko/cwxzOMo1bk4TyHIlByibiA5E=",
            ],
        },
        "google.com": {
            includeSubdomains: true,
            publicKeyHashes: [
                // GTS CA 1C3 (exp 30 Sep 2027)
                "zCTnfLwLKbS9S2sbp+uFz4KZOocFvXxkV06Ce9O5M2w=",
                // GTS Root R1 (exp 28 Jan 2028)
                "hxqRlPTu1bMS/0DITB1SSu0vd4u/8l8TjPgfaAp63Gc=",
            ],
        },
        // Firebase Remote Config
        "firebaseremoteconfig.googleapis.com": {
            includeSubdomains: false,
            publicKeyHashes: [
                // GTS CA 1C3 (exp 30 Sep 2027)
                "zCTnfLwLKbS9S2sbp+uFz4KZOocFvXxkV06Ce9O5M2w=",
                // GTS Root R1 (exp 28 Jan 2028)
                "hxqRlPTu1bMS/0DITB1SSu0vd4u/8l8TjPgfaAp63Gc=",
            ],
        },
    },
    [KeysetName.Incorrect]: {
        [myDomainPlaceholder]: {
            includeSubdomains: true,
            publicKeyHashes: incorrectKeys,
        },
        "google.com": {
            includeSubdomains: true,
            publicKeyHashes: incorrectKeys,
        },
        // Firebase Remote Config
        "firebaseremoteconfig.googleapis.com": {
            includeSubdomains: false,
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
