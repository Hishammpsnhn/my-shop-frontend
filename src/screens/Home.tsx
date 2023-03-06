import React from 'react'
import Cards from '../components/cards/Cards'
import Carousal from '../components/Carousal'

import Header from '../components/Header'


function Home() {
  return (
    <div>
      <Header />
      <Carousal/>
      <Cards />
    </div>
  )
}

export default Home