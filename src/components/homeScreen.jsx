import React, {useContext, useState} from 'react';
import axios from 'axios';
import '../homeScreen.css'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify/dist/react-toastify';

import LogoutCard from './logoutCard';
import { AuthProvider } from './authProvider';

const HomeScreen = () => {
    const [username, setUsername] = useState('');
    // const {sendUserName} = useContext(AuthProvider)
    // const { setAuthData } = useAuth();
    
    
    const navigate = useNavigate();

    const detectFace = async () => {
      try{
          const response = await axios.get('http://localhost:8001/detect_faces');
          const data = response.data;
          if(data.isValid){
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
          const response = await axios.get(`http://localhost:8001/get_user/${username}`);
          const data = response.data;
          console.log(data)
      
          if (data.isAvailable) {
            showToastWait();
            await handleFaceRecogniton();
          } 
          else {
                // showToast();
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
          const response = await axios.get(`http://localhost:8001/face-recognition/${username}`);
          const data = response.data;
          console.log('face detection:', response.data);
          if(data){
            navigate('/pincode', { state: { username } });
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
      <AuthProvider initialUsername={username}>
        <LogoutCard>
            <div className='grids'>
                <div className='streamBox'>
                        <h1>We are making your transactions safer!</h1>
                </div>
                <div className='recordButton'>
                    <p id="username-availability"></p>
                    <h2 >Enter the username</h2>
                    <input  
                        id="pincode"
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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