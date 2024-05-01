import React from 'react'
import Profile from 'components/Profile'
import Header from 'components/Header'
import Footer from 'components/Footer'
import PostList from 'components/PostList'
import Carousel from 'components/Carousel'

export default function ProfilePage() {
  return (
    <>
      <Header />
      <Profile />
      <PostList hasNavigation = {false}/>
      <Footer />
    </>
  )
}
