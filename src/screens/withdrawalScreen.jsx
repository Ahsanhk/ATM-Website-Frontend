import React, { useContext, useEffect, useState } from 'react';
import '../components/withdrawScreen.css'
import Card from './card';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './authProvider';
import { toast } from 'react-toastify/dist/react-toastify';
import { useWebSocket } from '../components/webSocketContext';

const WithdrawalScreen = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const {fistRecognized, onStopClick} = useWebSocket();
  const {cardData} = useContext(AuthContext);
  const currentBalance = cardData.balance;

  const navigate = useNavigate();

  
  useEffect(() => {
    if (fistRecognized) {
      console.log('Fist recognized. Logging out...');
      onStopClick();
      navigate('/');
    }
  }, [fistRecognized, navigate]);

//   useEffect(() => {
//     if (selectedAmount !== null) {
//         console.log("amount: ",selectedAmount)
//         navigate('/confirm', { state: { selectedAmount } });
//     }
// }, [selectedAmount]);

  const handleOptionClick = (option) => {
    console.log(`Clicked on: ${option}`);
  };

  const withdrawFunds = async () => {
    if (isNaN(selectedAmount)) {
      toast.info('please enter valid amount', {
        position: toast.POSITION.TOP_CENTER 
      });
      return;
    }

    const withdrawalAmount = parseFloat(selectedAmount);

    if (withdrawalAmount <= 0) {
      toast.info('please enter valid amount', {
        position: toast.POSITION.TOP_CENTER 
      });
      return;
    }

    if (withdrawalAmount > 50000) {
      toast.warning('withdrawal amount exceeded 50000', {
        position: toast.POSITION.TOP_CENTER 
      });
      return;
    }

    if (withdrawalAmount > currentBalance) {
      toast.warning('insufficient balance for withdrawal', {
        position: toast.POSITION.TOP_CENTER 
      });
      return;
    }

    // console.log('Withdrawal successful:', withdrawalAmount);
    navigate('/confirm', { state: { selectedAmount } });
  };

  return (
    <Card>
        <div className="withdrawal-screen">
            <h2>Enter Withdrawal Amount</h2>
            <h3 className="top-left-text">(in multiples of 500)</h3>
            <div className='input-body'>
                <div className="input-section">
                    <input
                    type="text"
                    placeholder="0000.00"
                    value={selectedAmount}
                    pattern='[0-9]*'
                    onChange={(e) => setSelectedAmount(e.target.value)}
                    />
                </div>
                <div className="options-withdraw">
                    <button className="option-withdraw-left" onClick={() => handleOptionClick('Cancel Transaction')}>
                    Cancel Transaction
                    </button>
                    <button className="option-withdraw-right" onClick={withdrawFunds}>
                    Withdraw Funds
                    </button>
                </div>
            </div>
        </div>
    </Card>
  );
};

export default WithdrawalScreen;
