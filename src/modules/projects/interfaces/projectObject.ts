export default interface ProjectObject {
    _id: string; // Changed to string as the ID is a string, not a number
    name: string;
    description: string;
    tags: Array<{
      _id: string;
      name: string;
      color: string;
    }>;
    image: string;
    source_code_link: string;
  }
  