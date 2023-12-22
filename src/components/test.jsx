// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// import Card from './card';

// const TestScreen = () => {
//   const [pincode, setPincode] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const apiUrl = 'http://localhost:3000/hello'; // Replace with your actual API URL

//     // Make an HTTP GET request to the API using the fetch API
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMessage(data.message);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setMessage('An error occurred while fetching data.');
//       });
//   }, []);


//   return (
//         <Card>
//             <div className='pinCode'>
//                 <h2>Please enter your PIN</h2>
//                 <p>Message from the backend: {message}</p>
//                 <h3>(Personal Identification Number)</h3>
//                 <input type="password" id="pincode" maxlength="4" />
//                 <Link to ='/account' >
//                     <button id='recordingButton'>Submit</button>
//                 </Link>
//             </div>
//         </Card>
                
//     );
// };

// export default TestScreen;
