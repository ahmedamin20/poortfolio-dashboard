
export default interface DefaultCrudInitialState<T, A> {
    all: {
        data: A[],
        loading: boolean,
    },
    show: {
        data: T,
        loading: boolean
    },
    deleteLoading: boolean
}