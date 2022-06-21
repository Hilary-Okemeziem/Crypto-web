import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';

const SavedCoin = () => {
    const [coins, setCoins] = useState([])
    const { user } = UserAuth();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        setCoins(doc.data()?.savedCoins);
        });
    }, [user?.email]);

    const coinPath = doc(db, 'users', `${user?.email}`);

    const deleteCoin = async (passedID) => {
        try {
            const result = coins.filter((item) => item.id !== passedID)
            await updateDoc(coinPath, {
                savedCoins: result
            });
        } catch (error) {
            console.log(error.message);    
        }
    };
    
  return (
    <div>
        {coins?.length === 0 ? (
            <p>
            You don't have any coins saved. Please save a coin to add it to your watch list. <Link to='/' className='text-accent'>Click here to search coins.</Link>
          </p>
        ) : (
            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4'>Rank #</th>
                        <th className='text-left'>Coin</th>
                        <th className='text-left'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {coins?.map((coin) => (
                        <tr key={coin.id} className='h=[60px] overflow-hidden'>
                            <td>{coin?.rank}</td>
                            <td>
                                <Link to={`/coin/${coin.Id}`}>
                                    <div className='flex items-center'>
                                        <img className='w-8 mr-4' src={coin?.image} alt="/" />
                                        <div>
                                            <p className='hidden sm:table-cell'>{coin?.name}</p>
                                            <p className='text-gray-500 text-left text-sm'>{coin?.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className='pl-8'>
                                <AiOutlineClose onClick={() => deleteCoin(coin.id)} className='cursor-pointer'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default SavedCoin