import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../components/amountScreen.css';
import Card from './card';
import { AuthContext } from './authProvider';
import Navbar from './navbar';

const AmountScreen = () => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    // const navigate = useNavigate();
    const {navigate} = useContext(AuthContext)

    useEffect(() => {
        if (selectedAmount !== null) {
            navigate('/confirm', { state: { selectedAmount } });
        }
    }, [selectedAmount, navigate]);

    const handleAmountSelection = (amount) => {
        setSelectedAmount(amount);
        // console.log('selected', amount)
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

