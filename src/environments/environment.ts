import { EnvironmentSchema } from './environment-schema';

export const environment: EnvironmentSchema = <EnvironmentSchema>{
    apiDomain: {
        gateway: "",
        notificationHub: "",
        coreEndpoint: "",
        prodEndpoint: "",
        scheduleEndpoint: "",
        logEndpoint: "",
        storageEndpoint: "",
        devEndpoint: "https://localhost:7013/api",
    }
};