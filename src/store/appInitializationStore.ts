import { create } from "zustand";

export interface AppInitializationState {
    isSslPinningAvailable: boolean;
    isSslPinningReady: boolean;
    isRemoteConfigReady: boolean;
}

const initialState: AppInitializationState = {
    isSslPinningAvailable: false,
    isSslPinningReady: false,
    isRemoteConfigReady: false,
};

export interface AppInitializationStoreMethods {
    // isAppReady: () => boolean;
    // setIsSslPinningAvailable: (value: boolean) => void;
    // setIsSslPinningReady: (value: boolean) => void;
    setIsRemoteConfigReady: (value: boolean) => void;
}

export const useAppInitializationStore = create<
    AppInitializationState & AppInitializationStoreMethods
>(set => ({
    ...initialState,
    // isAppReady: () => {
    //     const { isRemoteConfigReady, isSslPinningReady } = get();
    //     return [isSslPinningReady, isRemoteConfigReady].every(value => !!value);
    // },
    // setIsSslPinningAvailable: (value: boolean) =>
    //     set(prevState => ({ ...prevState, isSslPinningAvailable: value })),
    // setIsSslPinningReady: (value: boolean) =>
    //     set(prevState => ({ ...prevState, isSslPinningReady: value })),
    setIsRemoteConfigReady: (value: boolean) =>
        set(prevState => ({ ...prevState, isRemoteConfigReady: value })),
}));

export const useAppReadyState = () =>
    useAppInitializationStore(({ isRemoteConfigReady, isSslPinningReady }) =>
        [isSslPinningReady, isRemoteConfigReady].every(value => !!value),
    );
