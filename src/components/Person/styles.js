import styled, { keyframes, css } from "styled-components";

export const SpeechBubble = styled.div`
  background: white;
  font-weight: 800;
  font-size: 18px;
  border: 4px solid #000000;
  position: absolute;
  padding: 10px 15px;
  top: -55px;
  left: -64px;
  width: 256px;
  text-align: center;
  z-index: 3;
`;

export const PersonCrop = styled.div`
  height: 128px;
  width: 128px;
  overflow: hidden;
  position: relative;
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

export const PersonContainer = styled.div`
  opacity: 1;
  transition: opacity 0.3s ease 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 128px;
  height: 128px;
  transform: translate3d(384px, 384px, 0px);
`;

export const SpriteCanvas = styled.canvas`
  position: absolute;
  ${props => `top: ${props.direction};`}
  ${props =>
    css`
      ${props.behavior};
    `}
  /* top: directionsMap[currentDirection] */
  width: 512px;
  transform: translate3d(0px, 0px, 0px);
`;
