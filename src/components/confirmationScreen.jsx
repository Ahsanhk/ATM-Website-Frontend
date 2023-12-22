import React, { useContext, useEffect, useState } from 'react';
import Card from './card';
import { Link, useLocation, useNavigation } from 'react-router-dom';
import { AuthContext } from './authProvider';
import axios from 'axios';

const ConfirmScreen = () => {
    const [time, setTime] = useState(new Date());
    const {userData} = useContext(AuthContext);
    const location = useLocation();
    const selectedAmount = location.state.selectedAmount;
    console.log(selectedAmount)
    console.log(time)

    const transactionData = {
        time: time,
        amount: selectedAmount,
        username: userData.username,
    };


    const uploadTransactionData = async (transactionData) => {
        try {
          const response = await axios.post('http://192.168.50.75:8001/upload-transaction-data', transactionData);
          console.log('Transaction data uploaded successfully:', response.data.message);
        } catch (error) {
          console.error('Error uploading transaction data:', error.message);
        }
      };

      const handleOnClick = async () => {
         uploadTransactionData(transactionData)
        };

    


    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(new Date());
        }, 1000); 

        return () => clearInterval(intervalId);
    }, []);


    return (
        <Card>
            <div className='accountBody'>    
                <div>
                    <h2>Do you want Receipt</h2>
                </div>
                <div className='accountBodyButton' >
                    <Link to='/congrats'>
                        <button id='accountButton' onClick={handleOnClick}>Yes</button>
                    </Link>
                </div>
                <div className='accountBodyButton'>
                    <Link to='/congrats'>
                        <button id='accountButton' onClick={handleOnClick}>No</button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default ConfirmScreen ;
