/* eslint-disable import/no-named-as-default-member */
import Braze from "@braze/react-native-sdk";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as Sentry from "sentry-expo";

import { Button } from "./components/Button";
import { appConfig } from "./config/app.config";
import { sentryConfig } from "./config/sentry.config";
import { useApiClient } from "./hooks/useApiClient";
import { useRemoteConfig } from "./hooks/useRemoteConfig";
import { useAppInitializationStore, useAppReadyState } from "./store/appInitializationStore";

import type { GestureResponderEvent } from "react-native";

Braze.subscribeToInAppMessage(true, evt => {
    console.debug(new Date().toISOString(), "App.tsx: Got Braze message:", evt);
});

const sentryInitOpts = {
    debug: sentryConfig.isDebugEnabled,
    dsn: sentryConfig.dsn,
    enableInExpoDevelopment: sentryConfig.isDebugEnabled,
    environment: sentryConfig.environment,
    integrations: [
        //   new Sentry.Native.ReactNativeTracing({
        //     routingInstrumentation,
        //   }),
    ],
    tracesSampleRate: sentryConfig.tracesSampleRate,
};
console.debug(new Date().toISOString(), "App.tsx: Initializing Sentry:", sentryInitOpts);
Sentry.init(sentryInitOpts);

export const App = () => {
    const { query } = useApiClient();

    const isSslPinningReady = useAppInitializationStore(
        ({ isSslPinningReady }) => isSslPinningReady,
    );
    const isAppReady = useAppReadyState();

    useEffect(() => {
        console.debug(new Date().toISOString(), `${App.name}:`, {
            appInitializationState: useAppInitializationStore.getState(),
            isAppReady,
        });
    }, [isAppReady]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>();
    const [result, setResult] = useState<string | undefined>();

    const {
        config,
        error: remoteConfigError,
        // isLoading: isRemoteConfigLoading,
    } = useRemoteConfig({ isEnabled: isSslPinningReady });

    useEffect(() => {
        if (remoteConfigError) {
            setError(remoteConfigError);
        }
    }, [remoteConfigError]);

    const handlePressQuery = (_evt: GestureResponderEvent) => {
        const queryAsync = async () => {
            setIsLoading(true);
            setError(undefined);
            setResult(undefined);
            try {
                const resp = await query();
                setResult(resp ? `${resp.status} ${resp.statusText}` : undefined);
            } catch (err) {
                console.error(
                    new Date().toISOString(),
                    `${App.name}.${handlePressQuery.name}:`,
                    err,
                );
                setError(err as Error);
            }
            setIsLoading(false);
        };
        void queryAsync();
    };

    if (!isAppReady) {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Loading...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{config.title}</Text>
            </View>
            <View style={styles.rowsContainer}>
                <View style={styles.label}>
                    <Text>Target:</Text>
                </View>
                <TextInput
                    value={appConfig.getApiBaseUrl()}
                    editable={false}
                    selectTextOnFocus={true}
                    style={styles.input}
                />
                <Button
                    containerStyle={styles.button}
                    disabled={isLoading}
                    onPress={handlePressQuery}
                >
                    {isLoading ? "Loading..." : "Query"}
                </Button>
                {!isLoading && (
                    <View style={styles.row}>
                        {error ? (
                            <Text style={[styles.label, styles.error]}>{error.message}</Text>
                        ) : (
                            <Text style={styles.label}>Result: {result}</Text>
                        )}
                    </View>
                )}
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderColor: "#888",
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        flexShrink: 1,
        justifyContent: "center",
        minHeight: 24,
    },
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
    },
    error: {
        backgroundColor: "#f00",
        color: "#fff",
        fontWeight: "bold",
    },
    input: {
        borderColor: "#888",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        flexShrink: 1,
        minHeight: 24,
    },
    label: {
        display: "flex",
        flexDirection: "row",
        flexShrink: 1,
        minHeight: 24,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        flexShrink: 1,
        justifyContent: "flex-start",
        width: "100%",
    },
    rowsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
    },
    title: {
        display: "flex",
        flexDirection: "row",
        flexShrink: 1,
        justifyContent: "center",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
