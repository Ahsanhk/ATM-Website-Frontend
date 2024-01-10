import React, { useState } from 'react';
import '../components/withdrawScreen.css'
import Card from './card';

const WithdrawalScreen = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const handleOptionClick = (option) => {
    // Handle the option click based on the selected option
    console.log(`Clicked on: ${option}`);
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
                    value={withdrawalAmount}
                    pattern='[0-9]*'
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    />
                </div>
                <div className="options-withdraw">
                    <button className="option-withdraw-left" onClick={() => handleOptionClick('Cancel Transaction')}>
                    Cancel Transaction
                    </button>
                    <button className="option-withdraw-right" onClick={() => handleOptionClick('Withdraw Funds')}>
                    Withdraw Funds
                    </button>
                </div>
            </div>
        </div>
    </Card>
  );
};

export default WithdrawalScreen;
