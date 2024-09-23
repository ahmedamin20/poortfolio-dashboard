import {NativeFileType} from "../../components/form/fileUploader/MultiLiveImageUploader.tsx";

export const renderFileSize = (size: number): string => {
    if (Math.round(size / 100) / 10 > 1000) {
        return `${(Math.round(size / 100) / 10000).toFixed(0)} MB`
    } else {
        return `${(Math.round(size / 100) / 10).toFixed(0)} KB`
    }
}

export const prepareDefaultFiles = (defaultFiles: NativeFileType[]) => {
    return defaultFiles.map((file: string | {id: number, url: string}) => {
        return typeof file === 'string' ? {url: file} : file;
    });
}