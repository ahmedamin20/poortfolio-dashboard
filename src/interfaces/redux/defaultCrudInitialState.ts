import {PaginationMeta} from "../paginationMeta.ts";

export default interface DefaultCrudInitialState<T, A> {
    all: {
        data: A[],
        loading: boolean,
        meta: PaginationMeta
    },
    show: {
        data: T,
        loading: boolean
    },
    deleteLoading: boolean
}