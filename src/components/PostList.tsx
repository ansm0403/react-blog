import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    hasNavigation? : boolean
}

type TabType = "all" | "my"

export default function PostList({hasNavigation = true} : Props) {
    const [activeTab, setActiveTab] = useState<TabType>("all");
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
        </div>
    }
    <div className = "post__list">
    {[...Array(10)].map((e, index)=>(
        <div key = {index} className = "post__box">
            <Link to={`/posts/${index}`}>
                <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name" >안상문</div>
                    <div className="post__date" >2023.06.04</div>
                </div>
                <div className = "post__title">게시글 {index}</div>
                <div className="post__text">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    It has survived not only five centuries, but also the leap into electronic typesetting, 
                    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <div className="post__util-box">
                    <div className="post__delete"></div>
                    <div className="post__edit"></div>
                </div>
            </Link>
        </div>
    ))}
    </div>
    </>
  )
}
