import React, { useContext, useEffect } from 'react';
import { AuthContext } from './authProvider';
import '../components/balanceScreen.css'
import Card from './card';
import { useWebSocket } from '../components/webSocketContext';

const BalanceScreen = () => {
    const {cardData, navigate} = useContext(AuthContext);
    const balance = cardData.balance
    const {logout} = useContext(AuthContext);
    const {fistRecognized, onStopClick} = useWebSocket();
    
    useEffect(() => {
        if (fistRecognized) {
          console.log('Fist recognized. Logging out...');
          onStopClick();
          navigate('/');
        }
      }, [fistRecognized, navigate]);


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
                <button className="option-left-balance" onClick={() => navigate('/account')}>
                Back to Options
                </button>
                <button className="option-right-balance" onClick={() => navigate('/home')}>
                End Transaction
                </button>
            </div>
        </div>
    </Card>
  );
};

export default BalanceScreen;