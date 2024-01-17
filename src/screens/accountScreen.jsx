import React, { useContext, useEffect } from 'react';
import Card from './card';
import '../components/accountScreen.css'
import { Link } from 'react-router-dom';
import { useWebSocket } from '../components/webSocketContext';
import { AuthProvider } from './authProvider';


const AccountScreen = () => {
    // const {cardData} = useContext(AuthProvider);
    // const { onStartClick } = useWebSocket();

    // const card_id = cardData ? cardData._id : null;

    // useEffect(() => {
    //     console.log("in account screen ", cardData)
    //     if (card_id) {
    //       onStartClick(card_id);
    //     }
    //   }, [card_id, onStartClick]);


    return(
        <Card>
            <div className="account-screen">
                <h2 className="top-left-text">Choose one option to continue</h2>
                <div className="options">
                    <div className="left-options">
                        <Link to='/amount'>
                            <div className="option-left">
                                <h3 className="heading">Fast Cash</h3>
                                <p>Get fast cash of selected value</p>
                            </div>
                        </Link>
                        <Link to='/withdraw'>
                            <div className="option-left">
                                <h3 className='heading'>Cash Withdrawal</h3>
                                <p>Withdraw money from your account</p>
                            </div>
                        </Link>
                    </div>
                    <div className="right-options">
                        <Link to='/balance'>
                            <div className="option-right">
                                <h3 className='heading'>Balance Inquiry</h3>
                                <p>Check balance of your account</p>
                            </div>
                        </Link>
                        <Link to='/home'>
                            <div className="option-right">
                                <h3 className='heading'>Cancel</h3>
                                <p>End transaction</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default AccountScreen;