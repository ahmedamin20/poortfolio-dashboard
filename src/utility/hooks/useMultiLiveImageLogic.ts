import {useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance.ts";
import { prepareDefaultFiles } from "../helpers/fileHelper.ts";
import { NativeFileType } from "../../components/form/fileUploader/MultiLiveImageUploader.tsx";

export type DefaultFileType = { id?: number, url: string } | File;
export const MAX_FILE_SIZE = 5000000;
export const allowedExtensions = ['.png', '.jpg', '.jpeg'];

type TargetFileType = {
    file: File;
    index: number;
};

const useMultiLiveImageLogic = ({ defaultImages }: { defaultImages: NativeFileType[] }) => {
    const [uploading, setUploading] = useState<boolean[]>([]);
    const [pending, setPending] = useState<boolean[]>([]);
    const [abortControllers, setAbortControllers] = useState<AbortController[]>([]);
    const [responseFilesPaths, setResponseFilesPaths] = useState<string[]>([]);
    const [files, setFiles] = useState<DefaultFileType[]>(prepareDefaultFiles(defaultImages));
    const [uploaded, setUploaded] = useState<boolean[]>([]);

    useEffect(() => {
        if(Array.isArray(defaultImages)) {
            defaultImages.forEach((_, index) => {
                setUploadedState(index, true)
                setUploadingState(index, false)
                setPendingState(index, false)
                setResponseFilePathState(index, '')
            })

            setFiles(prepareDefaultFiles(defaultImages));
        }
    }, [defaultImages]);

    const processUploading = async (): Promise<string[]> => {
        return new Promise<string[]>(async (resolve, reject) => {
            const targetFiles: TargetFileType[] = files
                .map((file: DefaultFileType, index: number) => {
                    if (file instanceof File && !uploaded[index] && pending[index]) {
                        return { file, index };
                    }
                    return null;
                })
                .filter((file) => file !== null) as TargetFileType[];

            const notUploaded = uploaded.filter((value: boolean) => !value);

            if (!targetFiles.length || !notUploaded.length) {
                resolve(responseFilesPaths.filter(path => !!path));
                return;
            }

            try {
                const uploadedFilePaths: string[] = [];
                for (const fileObject of targetFiles) {
                    await new Promise<void>((fileResolve, fileReject) => {
                        const { file, index } = fileObject;
                        const formData = new FormData();
                        formData.append('source', file);

                        setUploadingState(index, true);

                        axiosInstance
                            .postForm('/api/image_upload', formData, {
                                signal: abortControllers[index]?.signal || undefined,
                            })
                            .then((result) => {
                                const filePath = result.data.data.source;
                                setResponseFilePathState(index, filePath);
                                setPendingState(index, false);
                                setUploadedState(index, true);
                                uploadedFilePaths.push(filePath);
                                fileResolve();
                            })
                            .catch(() => {
                                setResponseFilePathState(index, '');
                                setPendingState(index, true);
                                setUploadedState(index, false);
                                setUploadingState(index, false);
                                fileReject();
                            })
                            .finally(() => setUploadingState(index, false));
                    });
                }
                resolve(uploadedFilePaths);
            } catch (error) {
                reject(error);
            }
        });
    };



    const handleAbort = (index: number) => {
        if (abortControllers[index]) abortControllers[index].abort();
    };

    const setUploadingState = (index: number, value: boolean | undefined) => {
        setUploading((prevUploading) => {
            const updatedUploading = [...prevUploading];
            if (value !== undefined) {
                updatedUploading[index] = value;
            } else {
                updatedUploading.splice(index, 1);
            }
            return updatedUploading;
        });
    };

    const setPendingState = (index: number, value: boolean | undefined) => {
        setPending((prevPending) => {
            const updatedPending = [...prevPending];
            if (value !== undefined) {
                updatedPending[index] = value;
            } else {
                updatedPending.splice(index, 1);
            }
            return updatedPending;
        });
    };

    const setUploadedState = (index: number, value: boolean | undefined) => {
        setUploaded((prevUploaded) => {
            const updatedUploaded = [...prevUploaded];
            if (value !== undefined) {
                updatedUploaded[index] = value;
            } else {
                updatedUploaded.splice(index, 1);
            }
            return updatedUploaded;
        });
    };

    const setResponseFilePathState = (index: number, value: string | undefined) => {
        setResponseFilesPaths((prevPaths) => {
            const updatedPaths = [...prevPaths];
            if (value !== undefined) {
                updatedPaths[index] = value;
            } else {
                updatedPaths.splice(index, 1);
            }
            return updatedPaths;
        });
    };

    const setAbortControllerState = (index: number, value: AbortController | null = null) => {
        setAbortControllers((prevControllers) => {
            const updatedControllers = [...prevControllers];
            if (!value) {
                updatedControllers.splice(index, 1);
            }
            return updatedControllers;
        });
    };

    const setFileState = (index: number, value: File) => {
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = value;
            return updatedFiles;
        });
    };

    const resetAll = () => {
        setAbortControllers([]);
        setFiles([]);
        setUploaded([]);
        setPending([]);
        setUploading([]);
        setResponseFilesPaths([]);
    };

    return {
        handleAbort,
        setUploadingState,
        setPendingState,
        processUploading,
        setFiles,
        setUploadedState,
        resetAll,
        setAbortControllerState,
        setResponseFilePathState,
        setFileState,
        uploading,
        pending,
        responseFilesPaths,
        files,
        uploaded,
    };
};

export default useMultiLiveImageLogic;
