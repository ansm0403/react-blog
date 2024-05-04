import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import Header from './Header'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category, Post } from 'type/post';


export const CATEGORIES : Category[] = [
    "Frontend",
    "Backend",
    "Web",
    "Native",
]

export default function PostForm() {
    const [post, setPost] = useState<Post | null>(null)
    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<Category | string>("Frontend");
    const {user} = useContext(AuthContext);
    
    const navigation = useNavigate();
    const {id : params} = useParams();

    const onSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(post && post.id) { 
                // 포스트가 있다면, 즉 현재 포스트의 수정페이지 일 때
                const postRef = doc(db, "posts", post?.id);
                await updateDoc(postRef,{
                    title : title,
                    summary : summary,
                    content : content,
                    updatedAt : new Date()?.toLocaleDateString("ko", {
                        hour : "2-digit",
                        minute : "2-digit",
                        second : "2-digit",
                    }),
                    category : category,
                });
                toast.success("게시글을 수정하였습니다.");
                navigation(`/posts/${post.id}`);

            } else {
                // 포스트가 없다면, 즉 현재 글을 생성하는 페이지일 때
                await addDoc(collection(db, "posts"),{
                    title : title,
                    summary : summary,
                    content : content,
                    createdAt : new Date()?.toLocaleDateString("ko", {
                        hour : "2-digit",
                        minute : "2-digit",
                        second : "2-digit",
                    }),
                    email : user?.email,
                    uid : user?.uid,
                    category : category, 
                });
                navigation('/');
                toast?.success("게시글을 생성하였습니다.")
            }
        } catch(error : any) {
            console.log(error);
            toast.error(error?.code)
        }
    }

    const onChange = ( e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target : {name, value}
        } = e;
        if(name === "title"){
            setTitle(value);
        }
        if(name === "summary"){
            setSummary(value);
        }
        if(name === "content"){
            setContent(value);
        }
        if(name ==="category"){
            setCategory(value);
        }
    }

    const getPost = async(id : string) => {
        if(id){
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            console.log(docSnap?.data());

            setPost({id : docSnap.id, ...docSnap.data() as Post})
        }
    }

    useEffect(()=>{
        if(params) getPost(params);
    },[params])

    useEffect(()=>{
        if(post){
            setTitle(post?.title)
            setContent(post?.content)
            setSummary(post?.summary)
            setCategory(post?.category)
        }
    },[post])

  return (
        <form onSubmit={onSubmit} className='form'>
            <div className='form__block'>
                <label htmlFor='title'>제목</label>
                <input type = "text" name = 'title' id = 'title' required onChange = {onChange} value={title}/>
            </div>
            <div className='form__block'>
                <label htmlFor='category'>카테고리</label>
                <select name = 'category' id = "category" onChange={onChange} defaultValue={category}>
                    <option value = "">카테고리를 선택해주세요.</option>
                    {CATEGORIES.map((category)=>{
                        return(
                         <option value = {category} key={category}>{category}</option>   
                        )
                    })}
                </select>
            </div>
            <div className='form__block'>
                <label htmlFor='summary'>요약</label>
                <input type = "text" name = 'summary' id = 'summary' required onChange = {onChange} value={summary}/>
            </div>
            <div className='form__block'>
                <label htmlFor='content'>내용</label>
                <textarea name = 'content' id = 'content' required onChange = {onChange} value={content}/>
            </div>
            <div className='form__block'>
                <input type = "submit" value = {post ? "수정" : "제출"} className='form__btn--submit' />
            </div>
        </form>
  )
}
