import styled, { keyframes, css } from "styled-components";

const frameWidth = 7; //this could come from a prop or something
const frameHeight = 7; //this could come from a prop or something
const cameraSpaceOnLeft = Math.floor(frameWidth / 2); //3 spaces on left of hero
const cameraSpaceOnTop = Math.floor(frameHeight / 2); //3 spaces on top of hero

const fontSizes = {
  4: "18px",
  3: "14px",
  2: "14px",
  1: "14px"
};

export const PersonCrop = styled.div`
  overflow: hidden;
  position: relative;
`;

export const SpriteCanvas = styled.canvas`
  position: absolute;
  ${props => `top: ${props.direction};`}
  ${props =>
    css`
      ${props.behavior};
    `}
  transform: translate3d(0px, 0px, 0px);
`;

export const SpeechBubble = styled.div`
  background: white;
  font-weight: 800;
  font-size: 18px;
  border: 4px solid #000000;
  position: absolute;
  padding: 10px 15px;
  left: -64px;
  text-align: center;
  z-index: 3;
`;

export const PersonContainer = styled.div`
  opacity: 1;
  transition: opacity 0.3s ease 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${props => `${props.pixelSize * 32}px`};
  height: ${props => `${props.pixelSize * 32}px`};
  transform: ${props =>
    `translate3d(${props.pixelSize *
      32 *
      cameraSpaceOnLeft}px, ${props.pixelSize *
      32 *
      cameraSpaceOnTop}px, 0px)`};

  ${PersonCrop} {
    width: ${props => `${props.pixelSize * 32}px`};
    height: ${props => `${props.pixelSize * 32}px`};
  }

  ${SpriteCanvas} {
    width: ${props => `${props.pixelSize * 32 * 4}px`};
  }

  ${SpeechBubble} {
    width: ${props => `${props.pixelSize * 32 * 2}px`};
    left: ${props => `-${(props.pixelSize * 32) / 2}px`};
    bottom: ${props => `${props.pixelSize * 32 * 1.25}px`};
    font-size: ${props => {
      return `${fontSizes[props.pixelSize]}`;
    }};
  }
`;

const WalkKeyframes = keyframes`
  from {
    transform: translate3d(0%,0%,0);
  }
  to {
    transform: translate3d(-100%,0%,0);
  }
`;

export const WalkAnimation = css`
  animation: ${WalkKeyframes} 0.6s steps(4) infinite;
`;

export const StandAnimation = css`
  animation: none;
`;
