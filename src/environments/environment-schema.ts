export interface EnvironmentSchema { 
    apiDomain: {
        gateway: string,
        notificationHub: string,
        coreEndpoint: string,
        prodEndpoint: string,
        scheduleEndpoint: string,
        logEndpoint: string,
        storageEndpoint: string,
        devEndpoint: string,
    };
}