import React from 'react';
import Card from './card';
import { Link } from 'react-router-dom';


const AccountScreen = () => {

    return(
        <Card>
            <div className='accountBody'>    
                <div>
                    <h2>Please select your account type</h2>
                </div>
                <div className='accountBodyButton'>
                    <Link to='/amount'>
                        <button id='accountButton'>Current</button>
                    </Link>
                    <Link to='/amount'>
                        <button id='accountButton'>Saving</button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}

export default AccountScreen;