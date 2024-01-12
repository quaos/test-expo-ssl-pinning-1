export const appConfig = {
    apiDomain: process.env.APP_API_DOMAIN ?? "quaos-portfolio.netlify.app",
    apiPath: process.env.APP_API_PATH ?? "/data/portfolio.json",
    getApiBaseUrl() {
        return `https://${appConfig.apiDomain}${appConfig.apiPath}`;
    },
};
