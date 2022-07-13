import {useEffect,useState} from 'react'
import Axios from 'axios'
import Coin from './component/Coin';
import './App.css';


function App() {

  const [listOfCoins, setListOfCoins] = useState([])
  const [searchCoin, setSearchCoin] = useState("")
  useEffect(()=>{
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0")
    .then((coin)=>{
      console.log(coin)
      setListOfCoins(coin.data.coins)
    })
  },[])

  const filteredCoins = listOfCoins.filter((coin)=>{
      return coin.name.toLowerCase().startsWith(searchCoin.toLowerCase())
    })
  

  return (
    <div className="app">
      <div className='crypto-header'>
        <h2>Search a crypto..</h2>
        <input type="text" onChange={(e)=>setSearchCoin(e.target.value)} placeholder='bitcoin...'/>
      </div>
      <div className='crypto-display'>
          {filteredCoins.map((item)=>{
              return <Coin 
              key={item.key}
              icon={item.icon} name={item.name} 
              price={item.price} 
              symbol={item.symbol}
              />
          })}
      </div>
        

    </div>
  );
}

export default App;
