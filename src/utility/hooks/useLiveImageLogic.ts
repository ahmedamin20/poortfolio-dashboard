import {useRef, useState} from "react";
import axiosInstance from "../../api/axiosInstance.ts";
import {AxiosProgressEvent} from "axios";

const useLiveImageLogic = () => {
    const [progress, setProgress] = useState(0);
    const [responseFilePath, setResponseFilePath] = useState<string | null>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const controllerRef = useRef<AbortController | null>(null);
    const [file, setFile] = useState<File|null>(null);
    const [uploaded, setUploaded] = useState<boolean>(false)

    const processUploading = async (): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            if (!file || uploaded) {
                resolve();
                return;
            }
            controllerRef.current = new AbortController();

            const formData = new FormData();
            formData.append('source', file);

            setUploading(true);

            axiosInstance
                .postForm('/api/image_upload', formData, {
                    signal: controllerRef.current.signal,
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent?.total || 1));
                        setProgress(percent);
                    },
                })
                .then((result) => {
                    setResponseFilePath(result.data.data.source);
                    setUploaded(true);
                    resolve();
                })
                .catch(() => {
                    setResponseFilePath('');
                    setProgress(0);
                    reject();
                })
                .finally(() => setUploading(false));
        });
    };

    const handleAbort = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return {
        handleAbort,
        processUploading,
        progress,
        uploading,
        responseFilePath,
        setFile,
        setUploaded,
        file,
    }
}

export default useLiveImageLogic