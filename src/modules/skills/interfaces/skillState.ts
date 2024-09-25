import DefaultNonPaginatedState from "../../../interfaces/redux/defaultNonPaginatedState.ts";
import SkillObject from "./skillObject.ts";
import SkillTableObject from "./skillTableObject.ts";

export default interface SkillState extends DefaultNonPaginatedState<SkillObject, SkillTableObject>{}