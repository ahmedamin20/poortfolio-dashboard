export default interface ExperienceObject {
    _id: number;
    companyName: string;
    date: string;
    logo: string;
    logoBg: string;
    points: string[];
    projects: Project[];
    title: string;
    __v: number;
}

interface Project {
    projectName: string;
    projectUrl: string;
    _id: string;
}
