import ProjectObject from "../interfaces/projectObject";

export type StoreProject = Omit<ProjectObject, 'id'>
export type UpdateProject = StoreProject;