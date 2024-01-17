import React, {useContext, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify/dist/react-toastify';
import { useWebSocket } from '../components/webSocketContext';

import { AuthContext } from './authProvider';
import LogoutCard from './logoutCard';

const PincodeScreen = () => {
    const location = useLocation();
    const {cardNumber} = location.state;
    const { fetchUserData, fetchCardData, cardData } = useContext(AuthContext);
    const { onStartClick } = useWebSocket();

    const card_id = cardData._id; 

    const navigate = useNavigate();
    const [pincode, setPincode] = useState('');
    
    const showToastFear = () => {
        toast.error('fear detected! contact helpline', {
          position: toast.POSITION.TOP_CENTER 
        });
    };
    
 
    const validatePincode = async (cardNumber, pincode) => {
        const showToastError = () => {
            toast.error('incorrect pincode!', {
              position: toast.POSITION.TOP_CENTER 
            });
        };

        const cardDetails = {
          cardNumber,
          pincode,
        }
        try {
            const response = await axios.post(`http://localhost:8001/validate-pincode`, cardDetails);
            const data = response.data;
            console.log("fetched data: ",data)
            const user_id = data.userId;
            console.log("user id ",user_id);
            if (data.isValid) {
                
              // await Promise.all([
              //   fetchCardData(cardNumber),
              //   fetchUserData(user_id)
              // ]);
              console.log(card_id)
                onStartClick(card_id);
                // login();
                navigate('/account');
            }
            else{
                showToastError();
            }
        } 
        catch (error) {
            console.error(error);
            return false;
        }
    };

    const handleEmotionDetection = async () => {
        try{
          const response = await axios.get('http://localhost:8001/emotion-detection');
          const data = response.data;
          console.log("emotion response: ", response.data)
          if(data){
            showToastFear();
            navigate('/');
          }
        }
        catch(error){
          console.error("error detcting emotion: ", error)
        }
    }
    
    const handleOnClick = async () => {
         validatePincode(cardNumber, pincode);
        //  handleEmotionDetection();
    };

    return(
        <LogoutCard>
          <div className='pinCode'>
              <h2>Please enter your PIN</h2>
              <h3>(Personal Identification Number)</h3>
              <input
                type="password" 
                id="pincode" 
                maxLength="4" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
            />
              {/* <Link to ='/test' > */}
                  <button id='recordingButton' onClick={handleOnClick}>Submit</button>
              {/* </Link> */}
          </div>
        </LogoutCard>              
  );
}

export default PincodeScreen;