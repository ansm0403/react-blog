import React from 'react'
import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className='profile__box'>
        <div className = 'flex_box-lg'>
            <div className='profile__image' />
            <div>
                <div className='profile__email'>tkdans312@naver.com</div>
                <div className='profile__name'>안상문</div>
            </div>
            Profile
            <Link to = "/" className = "profile__logout">
                로그아웃
            </Link>
        </div>
    </div>
  )
}
