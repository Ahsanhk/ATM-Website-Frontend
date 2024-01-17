import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../components/amountScreen.css';
import Card from './card';
import { useWebSocket } from '../components/webSocketContext';
import { AuthContext } from './authProvider';
// import { AuthContext } from './authProvider';



const AmountScreen = () => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
    const {fistRecognized, onStopClick} = useWebSocket();

    useEffect(() => {
        if (fistRecognized) {
          console.log('Fist recognized. Logging out...');
          onStopClick();
          navigate('/');
        }
      }, [fistRecognized, navigate]);

    useEffect(() => {
        if (selectedAmount !== null) {
            console.log("amount: ",selectedAmount)
            navigate('/confirm', { state: { selectedAmount } });
        }
    }, [selectedAmount]);

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
    };

    return(
        <Card>
            <div className="amount-screen">
                <h2 className="top-left-text">Select the amount</h2>
                <div className="options">
                    <div className="left-options">
                        <button className="option" onClick={() => handleAmountSelection(500)}>
                            <h3>500</h3>
                        </button>
                        <button className="option" onClick={() => handleAmountSelection(1000)}>
                            <h3>1000</h3>
                        </button>
                        <button className="option" onClick={() => handleAmountSelection(2500)}>
                            <h3>2500</h3>
                        </button>
                    </div>
                    <div className="right-options">
                        <button className="option" onClick={() => handleAmountSelection(5000)}>
                            <h3>5000</h3>
                        </button>
                        <button className="option" onClick={() => handleAmountSelection(10000)}>
                            <h3>10000</h3>
                        </button>
                        <button className="option cancel" onClick={() => handleAmountSelection('Cancel')}>
                            <h3>Cancel</h3>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default AmountScreen;

