import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../card.css'
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
            <div className='topAmount'>
            <h2 id='amountText'>Please select the amount</h2>
                <div className='amountBox'>
                    {/* <Link to='/pincode'> */}
                        <div className='left-column'>
                            <button id='amountButton' onClick={() => handleAmountSelection(500)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    500
                                </Link>
                            </button>
                            <button id='amountButton' onClick={() => handleAmountSelection(1000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    1000
                                </Link>
                            </button>
                            <button id='amountButton' onClick={() => handleAmountSelection(2000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    2000
                                </Link>
                            </button>
                            <button id='amountButton' onClick={() => handleAmountSelection(3000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    3000
                                </Link>
                            </button>
                        </div>
                    {/* </Link> */}
                        <div className='right-column'>
                            <button id='amountButton' onClick={() => handleAmountSelection(5000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    5000
                                </Link>
                            </button>
                            <button id='amountButton' onClick={() => handleAmountSelection(10000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    10000
                                </Link>
                            </button>
                            <button id='amountButton' onClick={() => handleAmountSelection(15000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    15000
                                </Link>
                            </button>
                            <button id='amountButton' onClick={() => handleAmountSelection(20000)}>
                                <Link to='/confirm' style={{color: 'white'}}>
                                    20000
                                </Link>
                            </button>
                        </div>
                </div>
            </div>
        </Card>
    );
}

export default AmountScreen;

