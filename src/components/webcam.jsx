import React, { useRef } from "react";
import Webcam from "react-webcam";
import '../stream.css'



const ReactWebcam = () => {
  const webcamElement = useRef(null);

  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };
  
  const capture = () => {
    const imageSrc = webcamElement.current.getScreenshot();

    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'image_live.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="webcam" style={{ width: 640 }}>
      <Webcam
        ref={webcamElement}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        mirrored={true}
      />
      <div className="buttonWebcam">    
        <button 
            id='recordingButton'
            onClick={capture}>
                Capture 
        </button>
      </div>
    </div>
  );
};

export default ReactWebcam;