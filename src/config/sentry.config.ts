export const sentryConfig = {
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? "https://xxxxxxxx@mock.ingest.sentry.io/yyyyyy",
    environment: process.env.EXPO_PUBLIC_SENTRY_ENV,
    get isDebugEnabled(): boolean {
        const valueStr = process.env.EXPO_PUBLIC_SENTRY_DEBUG;
        return valueStr ? /true/i.test(valueStr) : false;
    },
    get tracesSampleRate(): number {
        const valueStr = process.env.EXPO_PUBLIC_SENTRY_TRACE_SAMPLE_RATE;
        return valueStr ? Number(valueStr) : 1.0;
    },
};
