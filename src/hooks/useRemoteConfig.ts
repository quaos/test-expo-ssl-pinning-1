import remoteConfig from "@react-native-firebase/remote-config";
import { useCallback, useEffect, useState } from "react";

import type { FirebaseRemoteConfigTypes } from "@react-native-firebase/remote-config";

export interface RemoteConfigType extends FirebaseRemoteConfigTypes.ConfigDefaults {
    title: string;
}

const defaultConfig: RemoteConfigType = {
    title: "Untitled",
};

export interface UseRemoteConfigState {
    config: RemoteConfigType;
    error: Error | undefined;
    isLoading: boolean;
    reload: () => Promise<void>;
}

export const useRemoteConfig = (): UseRemoteConfigState => {
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
                `${useRemoteConfig.name}.${reloadAsync.name}: lastFetchStatus:`,
                remoteConfig().lastFetchStatus,
            );
            updateConfigValues();
        } catch (err) {
            console.error(new Date().toISOString(), err);
            setError(err as Error);
        }
        setIsLoading(false);
    }, [isLoading]);

    useEffect(() => {
        const initAsync = async () => {
            setIsLoading(true);
            console.debug(new Date().toISOString(), `${useRemoteConfig.name}.${initAsync.name}`);
            try {
                await remoteConfig().setDefaults(defaultConfig);
                await remoteConfig().setConfigSettings({
                    minimumFetchIntervalMillis: 1000,
                });

                const isSuccess = await remoteConfig().fetchAndActivate();
                if (isSuccess) {
                    console.debug(
                        new Date().toISOString(),
                        `${useRemoteConfig.name}.${initAsync.name}: lastFetchStatus:`,
                        remoteConfig().lastFetchStatus,
                    );
                    console.debug(
                        new Date().toISOString(),
                        `${useRemoteConfig.name}.${initAsync.name}: getAll:`,
                        remoteConfig().getAll(),
                    );
                    updateConfigValues();
                } else {
                    console.log(new Date().toISOString(), "No new Remote Config fetched");
                }
            } catch (err) {
                console.error(new Date().toISOString(), err);
                setError(err as Error);
            }
            setIsLoading(false);
        };
        void initAsync();
    }, []);

    return {
        config,
        error,
        isLoading,
        reload: reloadAsync,
    };
};
