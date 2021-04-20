import React from 'react'

import Header from './components/Header'

import './styles.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='layout'>
        {children}
      </div>
    </>
  )
}

export default Layout
