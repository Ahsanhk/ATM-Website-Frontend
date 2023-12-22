import React from 'react';
//import Video from "../man.mp4";
import '../stream.css'
import '../homeScreen.css'
import Navbar from './navbar';
import ReactWebcam from './webcam';
import { Link } from "react-router-dom";


const StreamScreen = () => {

    
    //const imageURL = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rawpixel.com%2Fsearch%2Fman&psig=AOvVaw1f4vNOKPP0ufFyawtfM_cL&ust=1683834576191000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCICQ9t_C6_4CFQAAAAAdAAAAABAI';
    return(
        <div className='container'>
            <Navbar />
            <div className='backBox'>
                <Link to ='/' >
                        <button id='backButton'>Back</button>
                </Link>
            </div>

            <div className='bodyStream'>
                <div className='grids'>
                    
                    <div className='videoBox'>
                        
                        {/* <video controls autostart autoPlay src={Video} type="video.mp4" id='video' />  */}
                        <ReactWebcam />
                    </div>
                    <div className='streamButton'>
                        {/* <button
                            id='recordingButton'
                            onClick={capture}
                        >
                            Capture
                        </button> */}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default StreamScreen;