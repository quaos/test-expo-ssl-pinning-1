import axios, { type AxiosResponse } from "axios";
import { useMemo } from "react";

import { appConfig } from "../config/app.config";

export interface UseApiClientState {
    query: <T>(endpoint?: string) => Promise<AxiosResponse<T>>;
}

export const useApiClient = () => {
    const axiosInstance = useMemo(
        () =>
            axios.create({
                baseURL: appConfig.getApiBaseUrl(),
            }),
        [],
    );

    const query = async (endpoint?: string) => {
        console.debug(`${useApiClient.name}.${query.name}: GET ${endpoint}`, {
            baseUrl: axiosInstance.defaults.baseURL,
        });
        return axiosInstance.get(endpoint ?? "");
    };

    return { query };
};
