/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        VITE_API_URL: string;
        VITE_APP_TITLE: string;
    }
}
