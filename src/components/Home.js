import React from 'react'
import CoinSearch from './CoinSearch'
import Trending from './Trending'

const Home = ({coins}) => {
  return (
    <div>
      <CoinSearch coins={coins}/>
      <Trending/>
    </div>
  )
}

export default Home