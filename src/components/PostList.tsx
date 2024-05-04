import AuthContext from 'context/AuthContext';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Category, Post } from 'type/post';
import { CATEGORIES } from './PostForm';

interface Props {
    hasNavigation? : boolean
    defaultTab? : TabType;
}

type TabType = "all" | "my"



export default function PostList({hasNavigation = true, defaultTab = "all"} : Props) {
    const [activeTab, setActiveTab] = useState<TabType | Category>("all");
    const [posts, setPosts] = useState<Post[]>([]);
    const {user} = useContext(AuthContext);

    const getPosts = async () => {
        setPosts([]);
        let postsRef = collection(db, "posts");
        let postsQuery;
        
        if(activeTab === 'my' && user){
            // 나의 글만 보여줌
            postsQuery = query(postsRef, where('uid', '==', user.uid),  orderBy("createdAt", "asc"))
        } else if (activeTab === 'all') {
            // 전체 글 보여줌
            postsQuery = query(postsRef, orderBy("createdAt", "asc"));
        } else {
            // 카테고리 별로 글 보여줌
            postsQuery = query(postsRef, where('category', '==', activeTab),  orderBy("createdAt", "asc"))
        }
        const datas = await getDocs(postsQuery);

        datas?.forEach((doc)=>{
            const dataObj = {...doc.data(), id : doc.id};
            setPosts((prev)=>[...prev, dataObj as Post])
        })
    }

    const handleDelete = async (id : string) => {
        const confirm = window.confirm("게시글을 삭제하겠습니까?");
        if(confirm && id) {
            await deleteDoc(doc(db, "posts",id));
            toast.success("게시글을 삭제하였습니다.")
            getPosts();
        }
    }

    useEffect(()=>{
        getPosts();
    },[activeTab])

    return (
    <>
    {   hasNavigation &&
        <div className="post__navigation">
            <div 
                role = "presentation" 
                onClick = {()=>setActiveTab("all")}
                className={activeTab === 'all' ? "post__navigation--active" : ""}
            >
                전체 글
            </div>
            <div 
                role = "presentation" 
                onClick = {()=>setActiveTab("my")}
                className={activeTab === 'my' ? "post__navigation--active" : ""}
            >
                나의 글
            </div>
            {
                CATEGORIES?.map((category) => (
                    <div 
                        role = "presentation" 
                        onClick = {()=>setActiveTab(category)}
                        className={activeTab === category ? "post__navigation--active" : ""}
                    >
                        {category}
                    </div>
                ))
            }
        </div>
    }
    <div className = "post__list">
    {posts?.length > 0 ? posts?.map((post, index)=>(
        <div key = {post?.id} className = "post__box">
            <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name" >{post?.email}</div>
                    <div className="post__date" >{post?.createdAt}</div>
                </div>

                <div className = "post__title">{post?.title}</div>
                <div className="post__text">
                    {post?.summary}
                </div>
            </Link>
                { post?.email === user?.email && (
                    <div className="post__utils-box">
                        <div className="post__delete" onClick={()=>handleDelete(post?.id as string)}>삭제</div>
                        <div >
                            <Link to = {`/post/edit/${post?.id}`} className="post__edit" >
                                수정
                            </Link>
                        </div>
                    </div>
                )}
        </div>
    )): <div className='post__no-post'></div>}
    </div>
    </>
  )
}
