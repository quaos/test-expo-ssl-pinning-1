import remoteConfig from "@react-native-firebase/remote-config";
import { useCallback, useEffect, useState } from "react";

import { useAppInitializationStore } from "../store/appInitializationStore";

import type { FirebaseRemoteConfigTypes } from "@react-native-firebase/remote-config";

export interface RemoteConfigType extends FirebaseRemoteConfigTypes.ConfigDefaults {
    title: string;
}

const defaultConfig: RemoteConfigType = {
    title: "Untitled",
};

export interface UseRemoteConfigOptions {
    isEnabled?: boolean;
}

export interface UseRemoteConfigState {
    config: RemoteConfigType;
    error: Error | undefined;
    isLoading: boolean;
    reload: () => Promise<void>;
}

export const useRemoteConfig = ({
    isEnabled = true,
}: UseRemoteConfigOptions = {}): UseRemoteConfigState => {
    const setIsRemoteConfigReady = useAppInitializationStore(
        ({ setIsRemoteConfigReady }) => setIsRemoteConfigReady,
    );

    const [config, setConfig] = useState(defaultConfig);
    const [error, setError] = useState<Error | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const updateConfigValues = () => {
        setConfig(prevValues => ({
            ...prevValues,
            title: remoteConfig().getString("title"),
        }));
    };

    const reloadAsync = useCallback(async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        console.debug(new Date().toISOString(), `${useRemoteConfig.name}.${reloadAsync.name}`);
        try {
            await remoteConfig().fetch();
            console.debug(
                new Date().toISOString(),
                `${useRemoteConfig.name}.${reloadAsync.name}:`,
                { lastFetchStatus: remoteConfig().lastFetchStatus },
            );
            updateConfigValues();
            setIsRemoteConfigReady(true);
        } catch (err) {
            console.error(
                new Date().toISOString(),
                `${useRemoteConfig.name}.${reloadAsync.name}:`,
                err,
            );
            setError(err as Error);
        }
        setIsLoading(false);
    }, [isLoading, setIsRemoteConfigReady]);

    useEffect(() => {
        const initAsync = async () => {
            setIsLoading(true);
            console.debug(new Date().toISOString(), `${useRemoteConfig.name}.${initAsync.name}`);
            try {
                await remoteConfig().setDefaults(defaultConfig);
                await remoteConfig().setConfigSettings({
                    minimumFetchIntervalMillis: 1000,
                });

                const isFetched = await remoteConfig().fetchAndActivate();
                if (isFetched) {
                    console.debug(
                        new Date().toISOString(),
                        `${useRemoteConfig.name}.${initAsync.name}:`,
                        { lastFetchStatus: remoteConfig().lastFetchStatus },
                    );
                } else {
                    console.log(
                        new Date().toISOString(),
                        `${useRemoteConfig.name}.${initAsync.name}: No new Remote Config fetched`,
                    );
                }
                console.debug(
                    new Date().toISOString(),
                    `${useRemoteConfig.name}.${initAsync.name}: getAll:`,
                    remoteConfig().getAll(),
                );
                updateConfigValues();
                setIsRemoteConfigReady(true);
            } catch (err) {
                console.error(
                    new Date().toISOString(),
                    `${useRemoteConfig.name}.${initAsync.name}:`,
                    err,
                );
                setError(err as Error);
            }
            setIsLoading(false);
        };

        console.debug(new Date().toISOString(), `${useRemoteConfig.name}:`, { isEnabled });
        if (isEnabled) {
            void initAsync();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);

    return {
        config,
        error,
        isLoading,
        reload: reloadAsync,
    };
};
