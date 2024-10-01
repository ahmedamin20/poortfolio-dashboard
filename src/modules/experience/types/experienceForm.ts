import ExperienceObject from "../interfaces/experienceObject";

export type StoreExperience = Omit<ExperienceObject, 'id'>
export type UpdateExperience = StoreExperience;