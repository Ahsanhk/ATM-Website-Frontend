import React, { useContext } from 'react';
import { AuthContext } from './authProvider';
import '../components/balanceScreen.css'
import Card from './card';

const BalanceScreen = () => {
    const {cardData, navigate} = useContext(AuthContext);
    const balance = cardData.balance
    
    const [wholePart, decimalPart] = balance.toString().split('.');

  return (
    <Card>
        <div className="balance-screen">
            <div className='balance-adj'>
                <h2 className="top-left-text">Your Balance,</h2>
                <div className="balance-display">
                    <h1>{balance}</h1>
                </div>
            </div>
            <div className="options-balance">
                <button className="option-left-balance" onClick={() => navigate('account')}>
                Back to Options
                </button>
                <button className="option-right-balance" onClick={() => navigate('home')}>
                End Transaction
                </button>
            </div>
        </div>
    </Card>
  );
};

export default BalanceScreen;