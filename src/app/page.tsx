import Footer from '@/components/Footer'
import Herosectoin from '@/components/Herosectoin'
import LiveAuctions from '@/components/LiveAuctions'
import Navbar from '@/components/Navbar'
import TrendingItems from '@/components/TrendingItems'
import WhatWeDo from '@/components/WhatWeDo'
import React from 'react'

export default function page() {
  
  return (
    <div>
<Navbar/>
<Herosectoin/>
<WhatWeDo/>
<LiveAuctions/>
<TrendingItems/>
<Footer/>

    </div>
  )
}
