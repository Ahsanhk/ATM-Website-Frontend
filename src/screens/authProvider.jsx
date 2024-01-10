import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify/dist/react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [shouldLogout, setShouldLogout] = useState(false);
  const [stopChecking, setStopChecking] = useState(false);
  
  const navigate = useNavigate();

  const showToastError = () => {
    toast.error('more than one people detected in the booth!', {
      position: toast.POSITION.TOP_CENTER 
    });
  };



    const login = async (jwt_token, user_ID) => {
      try {
        setIsLoading(true);
        await localStorage.setItem("userToken", jwt_token);
        await localStorage.setItem("userID", user_ID);
        setUserToken(jwt_token);
        setUserID(user_ID);
        setIsLoading(false);
      } 
      catch (error) {
        console.error("Error setting userToken and userID:", error);
        setIsLoading(false);
      }
    };

    const logout = () => {
      setIsLoading(true);
      setUserToken(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userID");
      setIsLoading(false);
    };

    const isLoggedIn = async () => {
      try {
        setIsLoading(true);
        let userToken = await localStorage.getItem("userToken");
        let userID = await localStorage.getItem("userID");
        setUserToken(userToken);
        setUserID(userID);
        setIsLoading(false);
      } 
      catch (error) {
        console.error(error);
      }
    };


  const fetchUserData = async (user_id) => {
    try{
      console.log("userid in context", user_id);
      const response = await axios.get(`http://localhost:8001/get-user-data/${user_id}`);
      console.log(response.data);
      setUserData(response.data);
    }
    catch(error){
      console.error("error fetching user data: ", error);
    }
  }

  const fetchCardData = async (cardNumber) => {
    try{
      const response = await axios.get(`http://localhost:8001/get-card-details/${cardNumber}`);
      console.log(response.data);
      setCardData(response.data);
    }
    catch(error){
      console.error("error fetching user data: ", error);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  useEffect(() => {
    if (shouldLogout) {
      logout(); 
    }
  }, [shouldLogout]);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userID, setStopChecking, navigate, fetchUserData, userData, fetchCardData, cardData}}
    >
      {children}
    </AuthContext.Provider>
  );
};





// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export { useAuth}





// useEffect(() => {
//   if (stopChecking) {
//     setStopChecking(false);
//     checkMultipleFaces();
//   }
// }, [stopChecking]);

  // useEffect(() => {
  //   const checkInterval = setInterval(checkBackendVariable, 10000); 

  //   return () => {
  //     clearInterval(checkInterval);
  //   };
  // }, []);


  //   const checkMultipleFaces = async () => {
  //     console.log("stop video recording: ", stopChecking)
  //     try {
  //       if (!stopChecking) {
  //         const response = await axios.get('http://localhost:8000/detect_faces'); 
  //         const data = response.data;
  //         console.log("response but in data: ", data)
  //         console.log("response: ", response)

  //         if (data === true) {
  //           setShouldLogout(true);
  //           setStopChecking(true);
  //           showToastError()
  //           navigate('/');
  //         }
  //       }
  //     } 
  //     catch (error) {
  //       console.error("Error in multiple faces:", error);
  //     }
  // };
