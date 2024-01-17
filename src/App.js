import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify/dist/react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Route, Routes, } from 'react-router-dom';

import { AuthProvider } from './screens/authProvider';
import LockScreen from './screens/lock';
import HomeScreen from './screens/homeScreen';
import PincodeScreen from './screens/pincodeScreen';
import AccountScreen from './screens/accountScreen';
import AmountScreen from './screens/amountScreen';
import ConfirmScreen from './screens/confirmationScreen';
import CongratsScreen from './screens/congratScreen';
import WebSocketTest from './screens/testSocket';
import BalanceScreen from './screens/balanceScreen';
import WithdrawalScreen from './screens/withdrawalScreen';
import { WebSocketProvider } from './components/webSocketContext';
// import HandGestureDetection from './components/handTrack';
// import PrivateRoute from './components/privateRoute';


function App() {
  

  return (
    <WebSocketProvider>
    <AuthProvider>
      {/* <BrowserRouter> */}
          <Routes>
            <>
              <Route path='/' element={<LockScreen />} />
              <Route  path='/home' element = {<HomeScreen />} />
              <Route path='/pincode' element={<PincodeScreen />} />
              <Route path='/account' element={<AccountScreen />} />
              <Route path='/amount' element={<AmountScreen />} />
              <Route path='/confirm' element={<ConfirmScreen />} />
              <Route path='/congrats' element={<CongratsScreen />} />
              <Route path='/balance' element={<BalanceScreen />} />
              <Route path='/withdraw' element={<WithdrawalScreen />} />
              <Route path='/socketTest' element={<WebSocketTest />} />

              {/* <Route path='/time' element={<CurrentTime />} /> */}
              {/* <Route path='/test' element={<TestScreen />} /> */}
              {/* <Route  path='/stream' element = {<StreamScreen />} /> */}
            </>
          </Routes>
      {/* </BrowserRouter> */}
      <ToastContainer />
    </AuthProvider>
    </WebSocketProvider>
  );
}

export default App;