import {getPerPage} from "./paginationHelper";
import {PaginationMeta} from "../../interfaces/paginationMeta.ts";
import PaginationMetaObject from "../../interfaces/paginationObject.ts";
import DefaultCrudInitialState from "../../interfaces/redux/defaultCrudInitialState.ts";
import DefaultNonPaginatedState from "../../interfaces/redux/defaultNonPaginatedState.ts";

export const RESET_REDUCER_KEY = 'defaultStateAction'

export const resetStoreMethod = (initialState) => {
    return {
        defaultStateAction: () => initialState
    }
}

export const paginationInitialValues = (): {meta: PaginationMeta} => {
    return {
        meta: {
            currentPage: 1,
            from: 1,
            lastPage: 1,
            perPage: 5,
            total: 0
        }
    }
}


export const setPaginationAction = (paginationObject: PaginationMetaObject) => {
    return {
        from: paginationObject.from,
        currentPage: paginationObject.current_page,
        lastPage: paginationObject.last_page,
        perPage: paginationObject?.per_page || getPerPage(),
        total: paginationObject.total
    }
}

function createDefaultCrudInitialState<T, A>(showData: T, allData: A[]): DefaultCrudInitialState<T, A> {
    return {
        all: {
            data: allData,
            loading: false,
            ...paginationInitialValues()
        },
        show: {
            data: showData,
            loading: false
        },
        deleteLoading: false
    };
}

function createNonPaginatedCrudInitialState<T, A>(showData: T, allData: A[]): DefaultNonPaginatedState<T, A> {
    return {
        all: {
            data: allData,
            loading: false
        },
        show: {
            data: showData,
            loading: false
        },
        deleteLoading: false
    };
}

export const defaultCrudInitialState = <T, A>(): DefaultCrudInitialState<T, A> => {
    const placeholder = {} as T;
    const _ = [] as A[];

    return createDefaultCrudInitialState(placeholder, _);
};

export const defaultNonPaginatedState = <T, A>(): DefaultNonPaginatedState<T, A> => {
    const placeholder = {} as T;
    const _ = [] as A[];

    return createNonPaginatedCrudInitialState(placeholder, _);
}