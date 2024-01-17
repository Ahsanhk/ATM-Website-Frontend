import React, { useContext, useEffect, useState } from 'react';
import Card from './card';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import '../components/confirmScreen.css'
import { AuthContext } from './authProvider';
import axios from 'axios';
import { useWebSocket } from '../components/webSocketContext';

const ConfirmScreen = () => {
    const {cardData} = useContext(AuthContext);
    const location = useLocation();
    const selectedAmount = location.state.selectedAmount;

    const navigate = useNavigate();

    const { onStopClick, videoUrl, fistRecognized } = useWebSocket();
    
    useEffect(() => {
        if (fistRecognized) {
          console.log('Fist recognized. Logging out...');
          onStopClick();
          navigate('/');
        }
      }, [fistRecognized, navigate]);

    // const onStopButtonClick = () => {
    //     onStopClick();

    //     if (videoUrl) {
    //       console.log('Received video URL in ConfirmScreen:', videoUrl);
    //     } else {
    //       console.log('Waiting for the video URL...');
    //     }
    //   };
    
    //   useEffect(() => {
    //     console.log("recieved video url in confirm")
    //   }, [videoUrl]);


    useEffect(() => {
        if (videoUrl !== '') {
            console.log(selectedAmount);
          console.log('Video URL in ConfirmScreen:', videoUrl);
        //   if(videoUrl == ''){
            uploadTransactionData();
        //   }
          
        //   navigate('/congrats')
        }
      }, [videoUrl]);


    const uploadTransactionData = async () => {
        const TransactionData = {
            card_id: cardData._id,
            amount: selectedAmount,
            videoUrl: videoUrl,
            // status: true,
        };
        console.log("sending data: ",TransactionData);

        try {
          const response = await axios.post('http://localhost:8001/upload-transaction-data', TransactionData);
          console.log('Transaction data uploaded successfully:', response.data.message);
          navigate('/congrats')
        } 
        catch (error) {
          console.error('Error uploading transaction data:', error.message);
        }
      };

      const handleOnClick = async () => {
        onStopClick();
        console.log("videoUrl in in Confirm Screen ", videoUrl)
        // uploadTransactionData(transactionData);
        };


    return (
        <Card style={{ padding: '20px' }}>
            <div className='confirmScreen'>
                <div style={{ marginBottom: '10px' }}>
                    <h2 style={{color: '#474747'}}>Do you want Receipt</h2>
                </div>
                <div className='options'>
                    <div className='confirmOptions'>
                        <button id='confirmButton' onClick={handleOnClick}>
                            <h3>Yes</h3>
                        </button>
                        <button id='confirmButton' onClick={handleOnClick}>
                            <h3>No</h3>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default ConfirmScreen ;
