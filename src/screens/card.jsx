import React, { useContext } from 'react';
import '../components/card.css';
import { AuthContext } from './authProvider';

const Card = ({ children }) => {

    const { userData } = useContext(AuthContext);

    if(!userData){
        return(<h1>loading....</h1>)
    }

    return(
        <div className='body1'>
            <div className='container1'>
                <div className='header'>
                    <h2>Welcome {userData.fullname}!</h2>
                </div>   
            </div>
            <div className='cardBody'>
                <div>
                    {children} 
                </div>
            </div>
        </div>
    );

}

export default Card;