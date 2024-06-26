import React, {useState} from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify/dist/react-toastify';

import LogoutCard from './logoutCard';

function formatSize(input) {
  if (typeof input === 'number') {
    return `${input}px`;
  }
  return input;
}

const Lock = styled.svg``;

const Latch = styled.path`
  transition: all 0.3s ease-in-out;
  ${props =>
    props.state === 'open' ? "d: path('M 16 16 C 12 0 32 0 32 10')" : ''};
`;

export default function LockScreen() {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const showToastFail = () => {
      toast.error('multiple faces detected, can not be processed further!', {
        position: toast.POSITION.TOP_CENTER 
      });
    };

    const showToastSuccess = () => {
      toast.success('Preceed with you transcation!', {
        position: toast.POSITION.TOP_CENTER 
      });
    };

    const checkMultipleFaces = async () => {
        try{
          const response = await axios.get('http://localhost:8001/emotion-detection');
          const data = response.data;
          console.log(data)
  
          if(data){
            navigate('/')
            showToastFail();
            console.log('multiple faces or fear detected transaction can not be processed further!!!!')
          }
          else{
            console.log('no multiple faces detected');
            showToastSuccess();
            navigate('/home')
          }
  
        }
        catch(error){
          console.error(error);
        }
      }

    const lockDoor = () => {
    setShowMessage(true);

    setTimeout(() => {      
        setShowMessage(false);
        // navigate('/home');
    }, 2000);
  };

  const handleFaceCover = async () => {
    try{
      const response = await axios.get('http://localhost:8001/face_cover_check');
          const data = response.data;
          console.log(data)
          if(data.face_uncovered){
              console.log("faces covered :))");
              navigate('/');
          }
          else{
              console.log("face uncovered :((((");
              
          } 
    }
    catch(error)
    {
      error.log("error: ", error)
    }

  };

  const handleOnClick = () => {
      lockDoor();
      // handleFaceCover();
      checkMultipleFaces();
    };

  return (
    <LogoutCard>
      <Flex align="center" justify="center" p={8} h="40vw">
        <Padlock
          color="black"
          width={62}
          height={61}
          latchWidth={45}
          latchHeight={45}
          unlockEffect="rotateX"
          onClick={handleOnClick}
        />
        {/* <PadlockSVG /> */}
      </Flex>
    </LogoutCard>
  );
}

const Flex = styled.div`
  align-items: ${props => props.align};
  display: flex;
  height: ${props => formatSize(props.h)};
  justify-content: ${props => props.justify};
  padding: ${props => formatSize(props.p)};
  width: ${props => formatSize(props.w)};
`;

function getOpenStyles(props) {
  return css`
    transform: ${props.unlockEffect === 'rotateX'
      ? 'scaleX(-1)'
      : 'rotate(-45deg)'};
    bottom: 130%;
    left: -${props.unlockEffect === 'rotateX' ? 55 : 25}%;
  `;
}

const PadlockIcon = styled.span`
  border: 3px solid ${props => props.bgColor};
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0;
  height: ${props => formatSize(props.h)};
  padding: 0;
  position: relative;
  transition: all 0.1s ease-in-out;
  width: ${props => formatSize(props.w)};

  &::after {
    background: ${props => props.bgColor};
    content: '';
    display: block;
    height: 7px;
    left: 42%;
    position: absolute;
    top: 35%;
    transition: all 0.1s ease-in-out;
    width: 3px;
  }

  &::before {
    border: 3px solid ${props => props.bgColor};
    border-bottom: 0;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    bottom: 100%;
    content: '';
    display: block;
    height: ${props => formatSize(props.latchHeight)};
    left: 7%;
    position: absolute;
    transition: all 0.1s ease-in-out;
    width: ${props => formatSize(props.latchWidth)};
    ${props => (props.state === 'open' ? getOpenStyles(props) : '')};
  }

  &:hover::before {
    ${props => (props.state === 'closed' ? 'height: 12px' : '')};
  }
`;

const noop = () => {};

function Padlock({
  unlockEffect,
  color,
  width,
  height,
  onClick = noop,
  latchHeight,
  latchWidth
}) {
  let [lockState, setLockState] = React.useState('open');

  return (
    <PadlockIcon
      unlockEffect={unlockEffect}
      bgColor={color}
      w={width}
      h={height}
      latchHeight={latchHeight}
      latchWidth={latchWidth}
      onClick={e => {
        e.preventDefault();
        setLockState(prevState => (prevState === 'open' ? 'closed' : 'open'));
        onClick(e, lockState);
      }}
      state={lockState}
    />
  );
}

function PadlockSVG() {
  let [lockState, setLockState] = React.useState('open');

  return (
    <Flex
      align="center"
      justify="center"
      as="button"
      style={{
        background: 'transparent',
        border: 0,
        cursor: 'pointer'
      }}
      onClick={() =>
        setLockState(prevState => (prevState === 'open' ? 'close' : 'open'))
      }
    >
      <Lock xmlns="http://www.w3.org/2000/svg" width="48px" height="48px">
        <Latch
          state={lockState}
          d="M 16 16 C 12 0 36 0 32 16"
          stroke="black"
          strokeWidth="10"
          fill="transparent"
        />
        <rect
          x="12"
          y="16"
          width="24"
          height="21"
          rx="3"
          stroke="black"
          fill="transparent"
          strokeWidth="10"
        />
      </Lock>
    </Flex>
  );
}
