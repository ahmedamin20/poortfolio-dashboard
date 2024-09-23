import {RouteParams} from "./request.ts";
import {BuiltFormikParams} from "./formik.ts";
export type BaseStoreLogic = <ValuesType>(values: ValuesType, formikObject: BuiltFormikParams<any>) => void;
export type BaseUpdateLogic = <ValuesType>(values: ValuesType, id: string|number, formikObject: BuiltFormikParams<any>) => void;
export type BaseGetAllLogic = (params?: RouteParams) => void;
export type BaseShowOneLogic = (id: number|string) => void;
export type BaseDeleteLogic = (id: string|number) => void;
export type SelectMenuType = {
    id: string|number;
    name: string|number;
}