import React, {useContext, useState} from 'react';
import axios from 'axios';
import '../components/card.css'
import '../components/homeScreen.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify/dist/react-toastify';

import LogoutCard from './logoutCard';
import { AuthProvider } from './authProvider';

const HomeScreen = () => {
    const [cardNumber, setCardNumber] = useState('');
    // const {sendUserName} = useContext(AuthProvider)
    // const { setAuthData } = useAuth();
    
    
    const navigate = useNavigate();

    const detectFace = async () => {
      try{
          const response = await axios.get('http://localhost:8001/detect_faces');
          const data = response.data;
          if(data.exists){
              console.log("emotion detected successfully");
          }
          else{
              console.log("emotion not detected :(((");
          }
      }
      catch (error){
          console.error(error);
          return false;
      }
  };

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

  const showToastSuccess = () => {
    toast.success('face recognized!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

  const showToastWait = () => {
    toast.info('please wait while the system is recognizing the face!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };

    const checkUsernameAvailability = async () => {
        try {
          const response = await axios.get(`http://localhost:8001/get-user/${cardNumber}`);
          const data = response.data;
          // console.log(data)
      
          if (data.exists) {
            navigate('/pincode', { state: { cardNumber } });
            // showToastWait();
            // await handleFaceRecogniton();
          } 
          else {
                showToastRecognitionError();
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

      const handleFaceRecogniton = async () => {
        try{
          const response = await axios.get(`http://localhost:8001/face-recognition/${cardNumber}`);
          const data = response.data;
          console.log('face detection:', response.data);
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
                    
                    {/* <Link to ='/pincode' > */}
                        <button id='recordingButton' onClick={handleOnClick}>Start Transaction</button>                 
                    {/* </Link> */}
                </div>
            </div>
        </LogoutCard>
      </AuthProvider>
          </>
        );
}

export default HomeScreen;