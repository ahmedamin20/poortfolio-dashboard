import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllProjectsLoadingAction, setOneProjectAction, setOneProjectLoadingAction } from "../redux";
import axiosInstance from "../../../api/axiosInstance";
import ProjectRoutes from "../constants/routes";
import { formikErrorHandler } from "../../../utility/formik/formikHelper";
import { getUniqueParams } from "../../../utility/helpers/routeHelper";
import { RootState } from "../../../redux/store.ts";
import { BaseGetAllLogic, BaseShowOneLogic, BaseStoreLogic, BaseUpdateLogic } from "../../../types/api.ts";
import { setAllProjectsAction } from "../redux";

const useProjectLogic = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector((state: RootState) => state.projectsReducer),
        all = selector.all.data,
        allLoading = selector.all.loading,
        oneProject = selector.show.data,
        oneLoading = selector.show.loading,
        deleteLoading = selector.deleteLoading;

    const getAllProjectsLogic: BaseGetAllLogic = (params = undefined) => {
        params = params === undefined ? getUniqueParams() : params;
        dispatch(setAllProjectsLoadingAction(true))

        axiosInstance.get('/api/projects', { params }).then((response) => {
            dispatch(setAllProjectsAction(response.data.data))
        }).finally(() => dispatch(setAllProjectsLoadingAction(false)))
    }

    const getOneProjectLogic: BaseShowOneLogic = (id) => {
        dispatch(setOneProjectLoadingAction(true))

        axiosInstance.get(`/api/projects/${id}`).then((response) => {
            dispatch(setOneProjectAction(response.data.data));
        }).finally(() => dispatch(setOneProjectLoadingAction(false)))
    }

    const storeProjectLogic: BaseStoreLogic = (values, formikObject) => {
        const { setSubmitting } = formikObject;

        setSubmitting(true)

        axiosInstance.post('/api/projects', values)
            .then(() => navigate(ProjectRoutes.TABLE))
            // .catch((error) => formikErrorHandler(error.response.data, formikObject))
            .finally(() => setSubmitting(false))
    }

    const updateProjectLogic: BaseUpdateLogic = (values, id, formikObject) => {
        const { setSubmitting } = formikObject;

        setSubmitting(true)

        axiosInstance.put(`/api/projects/${id}`, values)
            .then(() => navigate(ProjectRoutes.TABLE))
            // .catch((error) => formikErrorHandler(error.response.data, formikObject))
            .finally(() => setSubmitting(false))
    }

    const deleteProjectLogic = (id: string | number) => {
        axiosInstance.delete(`/api/projects/${id}`).then(() => getAllProjectsLogic())
    }

    return {
        all,
        oneProject,
        allLoading,
        oneLoading,
        deleteLoading,
        getAllProjectsLogic,
        storeProjectLogic,
        updateProjectLogic,
        deleteProjectLogic,
        getOneProjectLogic
    }
}

export default useProjectLogic