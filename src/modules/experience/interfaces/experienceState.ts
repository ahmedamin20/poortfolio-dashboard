import DefaultNonPaginatedState from "../../../interfaces/redux/defaultNonPaginatedState.ts";
import ExperienceObject from "./experienceObject.ts";
import ExperienceTableObject from "./experienceTableObject.ts";

export default interface ExperienceState extends DefaultNonPaginatedState<ExperienceObject, ExperienceTableObject>{}