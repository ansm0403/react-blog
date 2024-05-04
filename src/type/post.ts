export interface Comment{
    content : string;
    uid : string;
    email : string;
    createdAt : string;
}

export interface Post{
    id? : string;
    title : string
    email : string;
    content : string;
    summary : string;
    createdAt : string;
    updatedAt : string;
    uid : string;
    category : Category;
    comments : Comment[];
}

export type Category = "Frontend" | "Backend" | "Web" | "Native";