import {useEffect} from "react";
import toastFactory from "../factories/toastFactory.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";

export const toastLoader = (isLoading: boolean|string) => {
    if (typeof isLoading === 'string') {
        const tableLoading = useSelector((state: RootState) => state[isLoading].all.loading)
        const deleteLoading = useSelector((state: RootState) => state[isLoading].deleteLoading);
        isLoading = tableLoading || deleteLoading
    }

    useEffect(() => {
        if (isLoading) {
            toastFactory.dismiss()
            toastFactory.loading('Loading')
        } else {
            toastFactory.dismiss()
        }
    }, [isLoading])
}