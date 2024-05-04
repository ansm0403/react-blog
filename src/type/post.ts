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
}

export type Category = "Frontend" | "Backend" | "Web" | "Native";