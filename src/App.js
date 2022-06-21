import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import CoinPage from './components/CoinPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data);
    })
  }, [url])
    return (
      <ThemeProvider>
        <AuthContextProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home coins={coins}/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/coin/:coinId' element={<CoinPage/>}>
              <Route path=':coinId'/>
            </Route>
          </Routes>
          <Footer/>
        </AuthContextProvider>
      </ThemeProvider>
    );
        
  
  
      

}

export default App;
