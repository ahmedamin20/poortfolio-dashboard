import SkillObject from "../interfaces/skillObject";

export type StoreSkill = Omit<SkillObject, 'id'>
export type UpdateSkill = StoreSkill;