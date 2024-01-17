import React, { useContext, useState} from 'react';
import axios from 'axios';
import '../components/card.css'
import '../components/homeScreen.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify/dist/react-toastify';

import LogoutCard from './logoutCard';
import { AuthContext, AuthProvider } from './authProvider';
import { useWebSocket } from '../components/webSocketContext';

const HomeScreen = () => {
    const [cardNumber, setCardNumber] = useState('');
    const navigate = useNavigate();
    const { fetchUserData, fetchCardData } = useContext(AuthContext);


  const showToastError = () => {
    toast.error('incorrect username!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

  const showToastRecognitionError = () => {
    toast.error('could not detect face, try again!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

  const showToastNotFound = () => {
    toast.warning('invalid card!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

  const showToastWait = () => {
    toast.info('please wait while the system is recognizing the face!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

  const showToastNotActive = () => {
    toast.warn('The card is temporary blocked by the owner!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

    const checkUsernameAvailability = async () => {
        try {
          const response = await axios.get(`http://localhost:8001/get-user/${cardNumber}`);
          const data = response.data;
          // console.log(data)
          
          if (data.exists) {
            if (data.activeStatus) {
              const user_id = data.userId;
              showToastWait();
              fetchCardData(cardNumber);
              fetchUserData(user_id);
              await handleFaceRecognition();
            } else {
              showToastNotActive();
            }
          } 
          else {
            showToastNotFound();
          }
        } 
        catch (error) {
          console.error(error);
          showToastError();
        }
      };

      const handleOnClick = async() => {
        checkUsernameAvailability();
      }

      const handleFaceRecognition = async () => {
        try{
          const response = await axios.get(`http://localhost:8001/face-recognition/${cardNumber}`);
          const data = response.data;
          console.log('face detection: ', response.data);
          if(data){
            navigate('/pincode', { state: { cardNumber } });
          }
          else{
            showToastRecognitionError();
            navigate('/');
          }
        }
        catch(error){
          console.error("error recognizing face", error)
        }
      }
      

    return(
      <>
      <AuthProvider initialUsername={cardNumber}>
        <LogoutCard>
            <div className='grids'>
                <div className='streamBox'>
                        <h1>We are making your transactions safer!</h1>
                        <h2 >Enter card number</h2>
                        
                </div>
                <div className='recordButton'>
                    <input  
                        id="pincode"
                        placeholder='username'
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />     
                    
                    <button id='recordingButton' onClick={handleOnClick}>Start Transaction</button>                 
                    
                </div>
            </div>
        </LogoutCard>
      </AuthProvider>
          </>
        );
}

export default HomeScreen;