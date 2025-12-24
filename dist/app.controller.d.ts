export declare class AppController {
    getApiInfo(): {
        message: string;
        version: string;
        status: string;
        timestamp: string;
        endpoints: {
            auth: string;
            reviews: string;
            replies: string;
            likes: string;
            notifications: string;
            admin: string;
            products: string;
        };
        websocket: string;
    };
    getHealthCheck(): {
        status: string;
        database: string;
        services: {
            auth: string;
            reviews: string;
            websocket: string;
        };
    };
}
