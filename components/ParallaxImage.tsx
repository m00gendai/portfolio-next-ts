"use client"

import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

interface Props{
    path: string    
}

export default function ParallaxImage({path}:Props){
    return(
        <ParallaxBanner className="parallax">
            <ParallaxBannerLayer image={`https://cms.mrweber.ch/storage/uploads/${path}`} speed={-20} />
        </ParallaxBanner>
    )
}