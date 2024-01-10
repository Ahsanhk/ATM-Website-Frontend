import React, { useContext } from 'react';
import '../components/card.css';
import Navbar from './navbar';

const LogoutCard = ({ children }) => {

    return(
        <div className='body1'>
            <div className='container1'>
                <Navbar
                />   
            </div>
            <div className='cardBody'>
                <div>
                    {children} 
                </div>
            </div>
        </div>
    );

}

export default LogoutCard;