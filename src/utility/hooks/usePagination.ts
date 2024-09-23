import {useEffect, useState} from "react";
import {getCurrentPage, getPerPage, updatePaginationParams} from "../helpers/paginationHelper";

const usePagination = (getAllDataLogic, additionalDependencies = []) => {
    const [currentPerPage, setCurrentPerPage] = useState(getPerPage());
    const [currentPage, setCurrentPageState] = useState(getCurrentPage());
    const deps: any[] = [currentPage, currentPerPage, ...additionalDependencies];

    useEffect(() => {
        getAllDataLogic();
    }, deps);

    const handlePageChange = (page: number) => {
        setCurrentPageState(page);
        updatePaginationParams(page, currentPerPage);
    };

    const handlePerPageChange = (perPage: number) => {
        setCurrentPerPage(perPage);
        updatePaginationParams(currentPage, perPage);
    };

    return {
        currentPerPage,
        currentPage,
        handlePageChange,
        handlePerPageChange
    };
};

export const generatePaginationObject = (object, meta) => {
    return {
        meta,
        currentPerPage: object.currentPerPage,
        currentPage: object.currentPage,
        handlePageChange: object.handlePageChange,
        handlePerPageChange: object.handlePerPageChange
    }
}
export default usePagination;
