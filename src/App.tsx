import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Button } from "./components/Button";
import { appConfig } from "./config/app.config";
import { useApiClient } from "./hooks/useApiClient";
import { useRemoteConfig } from "./hooks/useRemoteConfig";

import type { GestureResponderEvent } from "react-native";

export const App = () => {
    const { query } = useApiClient();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | undefined>();
    const [result, setResult] = useState<string | undefined>();

    const {
        config,
        error: remoteConfigError,
        isLoading: isRemoteConfigLoading,
    } = useRemoteConfig();

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
                console.error(new Date().toISOString(), err);
                setError(err as Error);
            }
            setIsLoading(false);
        };
        void queryAsync();
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{isRemoteConfigLoading ? "..." : config.title}</Text>
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
