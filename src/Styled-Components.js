import styled, { keyframes } from "styled-components";

const animate = (deg) =>
  deg <= 160
    ? keyframes`
  33%{
    transform: rotate(${deg}deg);  
  }
  60% {
    transform: rotate(${deg + 10}deg);
  }
  100% {
    transform: rotate(${deg}deg);
} 
`
    : keyframes`
    70% {
      transform: rotate(${deg + 5}deg);      
    }
  100% {
    transform: rotate(${deg}deg);
    } 
`;

export const Arrow = styled.div`
  height: 20px;
  width: 250px;
  transform-origin: bottom right;
  border-radius: 35%;
  background-color: #461d36;
  box-shadow: inset 3px 3px 3px black;
  position: absolute;
  bottom: -1%;
  right: 50%;
  animation: ${(props) => props.degrees && animate(props.degrees)} 3s linear;
  animation-fill-mode: forwards;
  @media (max-width: 500px) {
    bottom: -5%;
  }
  @media (max-width: 400px) {
    bottom: -10%;
  }
  @media (max-width: 370px) {
    bottom: -20%;
  }
`;

export const RaindropTask = styled.div`
  background-color: ${(props) => props.color};
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  position: absolute;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  opacity: ${(props) => (props.makeVisible ? 0.5 : 0)};
  border-radius: 25%;
  transition: opacity 1s ease-in-out;
  z-index: 1;
`;

const rotate = keyframes`
from {transform: rotate(0deg)}
to {transform: rotate(360deg)}
`;
export const Loader = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px dashed white;
  animation: ${rotate} 2s infinite;
`;
