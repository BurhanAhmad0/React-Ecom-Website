import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'

const HomeLayout = () => {
    return (
        <>
            {/* <Helmet>
                <link
                    rel="preload"
                    as="image"
                    href="/assets/bgImg.webp"
                />
            </Helmet> */}

            <header className="relative bg-[url('/assets/bgImg.webp')] bg-cover bg-bottom-right bg-no-repeat text-white">
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
                <Navbar bgColor='bg-transparent' />
                <HeroSection />
            </header>
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default HomeLayout
