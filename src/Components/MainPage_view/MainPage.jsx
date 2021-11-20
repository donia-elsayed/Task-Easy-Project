import React from 'react'
import Home  from '../home-page/Home/Home'
import About from '../home-page/About/About'
import Team  from '../home-page/Team/Team'
import Footer  from '../home-page/Footer/Footer'
export const MainPage = () => {
    return (
        <>
            <Home/>
            <About/>
            <Team/>
            <Footer />
        </>
    )
}
export default MainPage
