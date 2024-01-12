export const appConfig = {
    apiDomain: process.env.EXPO_PUBLIC_API_DOMAIN ?? "quaos-portfolio.netlify.app",
    apiPath: process.env.EXPO_PUBLIC_API_PATH ?? "/data/portfolio.json",
    getApiBaseUrl() {
        return `https://${this.apiDomain}${this.apiPath}`;
    },
};
