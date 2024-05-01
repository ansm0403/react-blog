import React, { useState } from 'react'

const IMAGE_URL = [
    "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1646668072507-b2215b873c70?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1713748941746-f6fc4028fe7c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

export default function Carousel() {
    const [activeImage, setActiveImage] = useState(1);  
    return (
        <div>
            <div className = "carousel">
                <ul className = "carousel__slides">
                    {
                        IMAGE_URL.map((image_url, index)=>{
                            return (
                                <>
                                    <input
                                        type = "radio"
                                        name = "radio-buttons"
                                        id = {`img-${index+1}`}
                                        checked = {activeImage === index+1}
                                        readOnly
                                    />
                                    <li className = "carousel__slide-container">
                                        <div className='carousel__slide-img'>
                                            <img
                                                alt = {`scenery ${index+1}`}
                                                src = {image_url}
                                            />
                                        </div>
                                        <div className = "carousel__controls">
                                            <label
                                                onClick = {()=>setActiveImage(index % IMAGE_URL.length)}
                                                className='carousel__slide-prev'
                                            >
                                                <span>&lsaquo;</span>
                                            </label>
                                            <label
                                                onClick={()=> setActiveImage((index+2) % IMAGE_URL.length)}
                                                className='carousel__slide-next'
                                            >
                                                <span>&rsaquo;</span>
                                            </label>
                                        </div>
                                    </li>
                                </>
                            )
                        })
                    }
                    {/* <input
                        type = "radio"
                        name = "radio-buttons"
                        id = "img-1"
                        checked = {activeImage === 1}
                        readOnly
                    />
                    <li className = "carousel__slide-container">
                        <div className='carousel__slide-img'>
                            <img
                                alt = "scenery 1"
                                src = {IMAGE_URL[0]}
                            />
                        </div>
                        <div className = "carousel__controls">
                            <label
                                onClick = {()=>setActiveImage(3)}
                                className='carousel__slide-prev'
                            >
                                <span>&lsaquo;</span>
                            </label>
                            <label
                                onClick={()=> setActiveImage(2)}
                                className='carousel__slide-next'
                            >
                                <span>&rsaquo;</span>
                            </label>
                        </div>
                    </li>
                    <input
                        type = "radio"
                        name = "radio-buttons"
                        id = "img-2"
                        checked = {activeImage === 2}
                        readOnly
                    />
                    <li className = "carousel__slide-container">
                        <div className='carousel__slide-img'>
                            <img
                                alt = "scenery 2"
                                src = {IMAGE_URL[1]}
                            />
                        </div>
                        <div className = "carousel__controls">
                            <label
                                onClick = {()=>setActiveImage(1)}
                                className='carousel__slide-prev'
                            >
                                <span>&lsaquo;</span>
                            </label>
                            <label
                                onClick={()=> setActiveImage(3)}
                                className='carousel__slide-next'
                            >
                                <span>&rsaquo;</span>
                            </label>
                        </div>
                    </li>
                    <input
                        type = "radio"
                        name = "radio-buttons"
                        id = "img-3"
                        checked = {activeImage === 3}
                        readOnly
                    />
                    <li className = "carousel__slide-container">
                        <div className='carousel__slide-img'>
                            <img
                                alt = "scenery 3"
                                src = {IMAGE_URL[activeImage+1]}
                            />
                        </div>
                        <div className = "carousel__controls">
                            <label
                                onClick = {()=>setActiveImage(2)}
                                className='carousel__slide-prev'
                            >
                                <span>&lsaquo;</span>
                            </label>
                            <label
                                onClick={()=> setActiveImage(1)}
                                className='carousel__slide-next'
                            >
                                <span>&rsaquo;</span>
                            </label>
                        </div>
                    </li> */}
                    <div className='carousel__dots'>
                    {
                        IMAGE_URL.map((url, index)=>{
                            return (
                                <label  
                                    onClick = {()=> setActiveImage(index+1)}
                                    className='carousel__dot'
                                    id = {`img-dot-${index+1}`}
                                />
                            )
                        })
                    }
                    </div>
                </ul>
            </div>
        </div>
    )
}
