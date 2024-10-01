import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllSkillsLoadingAction, setOneSkillAction, setOneSkillLoadingAction } from "../redux";
import axiosInstance from "../../../api/axiosInstance";
import SkillRoutes from "../constants/routes";
import { formikErrorHandler } from "../../../utility/formik/formikHelper";
import { getUniqueParams } from "../../../utility/helpers/routeHelper";
import { RootState } from "../../../redux/store.ts";
import { BaseGetAllLogic, BaseShowOneLogic, BaseStoreLogic, BaseUpdateLogic } from "../../../types/api.ts";
import { setAllSkillsAction } from "../redux";

const useSkillLogic = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector((state: RootState) => state.skillsReducer),
        all = selector.all.data,
        allLoading = selector.all.loading,
        oneSkill = selector.show.data,
        oneLoading = selector.show.loading,
        deleteLoading = selector.deleteLoading;

    const getAllSkillsLogic: BaseGetAllLogic = (params = undefined) => {
        params = params === undefined ? getUniqueParams() : params;
        dispatch(setAllSkillsLoadingAction(true))

        axiosInstance.get('/api/skills', { params }).then((response) => {
            dispatch(setAllSkillsAction(response.data.data))
        }).finally(() => dispatch(setAllSkillsLoadingAction(false)))
    }

    const getOneSkillLogic: BaseShowOneLogic = (id) => {
        dispatch(setOneSkillLoadingAction(true))

        axiosInstance.get(`/api/skills/${id}`).then((response) => {
            dispatch(setOneSkillAction(response.data.data));
        }).finally(() => dispatch(setOneSkillLoadingAction(false)))
    }

    const storeSkillLogic: BaseStoreLogic = (values, formikObject) => {
        const { setSubmitting } = formikObject;

        setSubmitting(true)

        axiosInstance.post('/api/skills', values)
            .then(() => navigate(SkillRoutes.TABLE))
            .catch((error) => formikErrorHandler(error.response.data, formikObject))
            .finally(() => setSubmitting(false))
    }

    const updateSkillLogic: BaseUpdateLogic = (values, id, formikObject) => {
        const { setSubmitting } = formikObject;

        setSubmitting(true)

        axiosInstance.put(`/api/skills/${id}`, values)
            .then(() => navigate(SkillRoutes.TABLE))
            .catch((error) => formikErrorHandler(error.response.data, formikObject))
            .finally(() => setSubmitting(false))
    }

    const deleteSkillLogic = (id: string | number) => {
        axiosInstance.delete(`/api/skills/${id}`).then(() => getAllSkillsLogic())
    }

    return {
        all,
        oneSkill,
        allLoading,
        oneLoading,
        deleteLoading,
        getAllSkillsLogic,
        storeSkillLogic,
        updateSkillLogic,
        deleteSkillLogic,
        getOneSkillLogic
    }
}

export default useSkillLogic