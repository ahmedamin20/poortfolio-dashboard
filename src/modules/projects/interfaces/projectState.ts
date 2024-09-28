import DefaultNonPaginatedState from "../../../interfaces/redux/defaultNonPaginatedState.ts";
import ProjectObject from "./projectObject.ts";
import ProjectTableObject from "./projectTableObject.ts";

export default interface ProjectState extends DefaultNonPaginatedState<ProjectObject, ProjectTableObject>{}