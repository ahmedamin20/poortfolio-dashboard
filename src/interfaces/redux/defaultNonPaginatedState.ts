import DefaultCrudInitialState from "./defaultCrudInitialState.ts";

export default interface DefaultNonPaginatedState<T, A> extends Omit<DefaultCrudInitialState<T, A>, 'all'> {
    all: {
        data: A[],
        loading: boolean,
    },
}