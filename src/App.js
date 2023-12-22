import './App.css';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, } from 'react-router-dom';

import StreamScreen from './components/streamingScreen';
import LockScreen from './components/lock';
import HomeScreen from './components/homeScreen';
import PincodeScreen from './components/pincodeScreen';
import AccountScreen from './components/accountScreen';
import AmountScreen from './components/amountScreen';
import CongratsScreen from './components/congratScreen';
import ConfirmScreen from './components/confirmationScreen';
import TestScreen from './components/test';
import { AuthProvider } from './components/authProvider';
import CurrentTime from './components/time';
        

function App() {

  return (
    <AuthProvider>
      {/* <Router> */}
          <Routes>
            <>
              <Route path='/' element={<LockScreen />} />
              <Route  path='/home' element = {<HomeScreen />} />
              <Route path='/pincode' element={<PincodeScreen />} />
              <Route path='/account' element={<AccountScreen />} />
              <Route path='/amount' element={<AmountScreen />} />
              <Route path='/confirm' element={<ConfirmScreen />} />
              <Route path='/congrats' element={<CongratsScreen />} />
              <Route path='/time' element={<CurrentTime />} />

              <Route path='/test' element={<TestScreen />} />
              <Route  path='/stream' element = {<StreamScreen />} />
            </>
          </Routes>
      {/* </Router> */}
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;