import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllExperiencesLoadingAction, setOneExperienceAction, setOneExperienceLoadingAction } from "../redux";
import axiosInstance from "../../../api/axiosInstance";
import ExperienceRoutes from "../constants/routes";
import { formikErrorHandler } from "../../../utility/formik/formikHelper";
import { getUniqueParams } from "../../../utility/helpers/routeHelper";
import { RootState } from "../../../redux/store.ts";
import { BaseGetAllLogic, BaseShowOneLogic, BaseStoreLogic, BaseUpdateLogic } from "../../../types/api.ts";
import { setAllExperiencesAction } from "../redux";

const useExperienceLogic = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector((state: RootState) => state.experienceReducer),
        all = selector.all.data,
        allLoading = selector.all.loading,
        oneExperience = selector.show.data,
        oneLoading = selector.show.loading,
        deleteLoading = selector.deleteLoading;

    const getAllExperiencesLogic: BaseGetAllLogic = (params = undefined) => {
        params = params === undefined ? getUniqueParams() : params;
        dispatch(setAllExperiencesLoadingAction(true))

        axiosInstance.get('/api/experiences', { params }).then((response) => {
            dispatch(setAllExperiencesAction(response.data.data));
        }).finally(() => dispatch(setAllExperiencesLoadingAction(false)))
    }

    const getOneExperienceLogic: BaseShowOneLogic = (id) => {
        dispatch(setOneExperienceLoadingAction(true))

        axiosInstance.get(`/api/experiences/${id}`).then((response) => {
            dispatch(setOneExperienceAction(response.data.data));
        }).finally(() => dispatch(setOneExperienceLoadingAction(false)))
    }

    const storeExperienceLogic: BaseStoreLogic = (values, formikObject) => {
        const { setSubmitting } = formikObject;

        setSubmitting(true)

        axiosInstance.post('/api/experiences', values)
            .then(() => navigate(ExperienceRoutes.TABLE))
            .catch((error) => formikErrorHandler(error.response.data, formikObject))
            .finally(() => setSubmitting(false))
    }

    const updateExperienceLogic: BaseUpdateLogic = (values, id, formikObject) => {
        const { setSubmitting } = formikObject;

        setSubmitting(true)

        axiosInstance.put(`/api/experiences/${id}`, values)
            .then(() => navigate(ExperienceRoutes.TABLE))
            .catch((error) => formikErrorHandler(error.response.data, formikObject))
            .finally(() => setSubmitting(false))
    }

    const deleteExperienceLogic = (id: string | number) => {
        axiosInstance.delete(`/api/experiences/${id}`).then(() => getAllExperiencesLogic())
    }

    return {
        all,
        oneExperience,
        allLoading,
        oneLoading,
        deleteLoading,
        getAllExperiencesLogic,
        storeExperienceLogic,
        updateExperienceLogic,
        deleteExperienceLogic,
        getOneExperienceLogic
    }
}

export default useExperienceLogic