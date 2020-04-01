/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

import usePixelSize from "./hooks/usePixelSize";

import MapGrid from "./components/Grid";
import Person from "./components/Person";

import useKeyPress from "./hooks/useKeyPress";

import "./global.css";

const worldData = {
  pixelSize: 4,
  mapData: {
    playerX: 1,
    playerY: 1,
    height: 14,
    width: 22,
    mapPxWidth: 704,
    mapPxHeight: 448,
    mapStyleWidth: 2816,
    mapStyleHeight: 1792
  }
};
const playerData = {};
const gameData = {};

const App = () => {
  const pixelSize = usePixelSize();

  const [currentPixelSize, setCurrentPixelSize] = useState(pixelSize);

  useEffect(() => {
    setCurrentPixelSize(pixelSize);
  }, [pixelSize]);
  return (
    <MainContainer>
      <Main pixelSize={currentPixelSize}>
        <WorldBackground></WorldBackground>
        <World>
          <Map
            x={11}
            y={7}
            width={worldData.mapData.width * (pixelSize * 32)}
            height={worldData.mapData.height * (pixelSize * 32)}
            pixelSize={currentPixelSize}
            mapSrc="jrq-outside-apartment.png"
          >
            <MapGrid
              show={false}
              mapWidth={worldData.mapData.width}
              mapHeight={worldData.mapData.height}
              pixelSize={currentPixelSize}
            ></MapGrid>
          </Map>
        </World>
      </Main>
    </MainContainer>
  );
};

const Map = ({ x, y, width, height, mapSrc, pixelSize, children }) => {
  const [xPos, setXPos] = useState(x);
  const [yPos, setYPos] = useState(y);

  const [currentCoord, setCurrentCoord] = useState(`${xPos}x${yPos}`);
  const [message, setMessage] = useState("");
  const [currentDirection, setCurrentDirection] = useState("DOWN");

  const walls = ["12x6", "13x5", "14x5", "15x5", "12x7", "11x6", "10x6"];

  const keyedUp = useKeyPress("ArrowUp");
  const keyedLeft = useKeyPress("ArrowLeft");
  const keyedDown = useKeyPress("ArrowDown");
  const keyedRight = useKeyPress("ArrowRight");

  const canvas = useRef(null);
  const mapBasePath = "./images/maps/";

  useLayoutEffect(() => {
    const ctx = canvas.current.getContext("2d");

    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };

    image.src = `${mapBasePath}${mapSrc}`;
  });

  useEffect(() => {
    if (keyedUp) {
      setCurrentDirection("UP");
      setYPos(prevValue => {
        if (walls.includes(`${xPos}x${prevValue - 1}`)) {
          setMessage(
            `I can't move up. There's a wall at ${xPos}x${prevValue - 1}!`
          );
          return prevValue;
        }

        return prevValue - 1;
      });
    }

    if (keyedDown) {
      setCurrentDirection("DOWN");
      setYPos(prevValue => {
        if (walls.includes(`${xPos}x${prevValue + 1}`)) {
          setMessage(
            `I can't move down. There's a wall at ${xPos}x${prevValue + 1}!`
          );
          return prevValue;
        }
        return prevValue + 1;
      });
    }

    if (keyedLeft) {
      setCurrentDirection("LEFT");
      setXPos(prevValue => {
        if (walls.includes(`${prevValue - 1}x${yPos}`)) {
          setMessage(
            `I can't move left. There's a wall at ${prevValue - 1}x${yPos}!`
          );
          return prevValue;
        }

        return prevValue - 1;
      });
    }

    if (keyedRight) {
      setCurrentDirection("RIGHT");
      setXPos(prevValue => {
        if (walls.includes(`${prevValue + 1}x${yPos}`)) {
          console.log(`wall at ${prevValue + 1}x${yPos}`);
          setMessage(
            `I can't move right. There's a wall at ${prevValue + 1}x${yPos}!`
          );
          return prevValue;
        }

        return prevValue + 1;
      });
    }
  }, [keyedDown, keyedUp, keyedLeft, keyedRight]);

  useEffect(() => {
    setMessage(`I'm on cell ${xPos}x${yPos}`);
    setCurrentCoord(`${xPos}x${yPos}`);
  }, [yPos, xPos]);

  return (
    <>
      <MapContainer
        style={{
          height: `${height}px`,
          width: `${width}px`,
          transform: `translate3d(
            ${getLeftPosition(xPos, pixelSize)}px,
            ${getTopPosition(yPos, pixelSize)}px,
          0)`
        }}
      >
        <canvas
          id="mapCanvas"
          ref={canvas}
          width={704}
          height={448}
          style={{
            height: `${height}px`,
            width: `${width}px`
          }}
        ></canvas>
        {children}
      </MapContainer>
      <Person
        message={message}
        direction={currentDirection}
        skinSrc="ZAK-SHEET.png"
        coord={currentCoord}
        pixelSize={pixelSize}
      ></Person>
    </>
  );
};

const getLeftPosition = (xPos, pixelSize) => {
  const frameWidth = 7; //this could come from a prop or something
  const cameraSpaceOnLeft = Math.floor(frameWidth / 2); //3 spaces on left of hero

  const cellWidth = pixelSize * 32;
  const cameraOffset = cellWidth * cameraSpaceOnLeft;

  // character offset position to keep them centered
  const leftPos = -(cellWidth * xPos);

  return leftPos + cameraOffset;
};

const getTopPosition = (yPos, pixelSize) => {
  const frameHeight = 7; //this could come from a prop or something
  const cameraSpaceOnTop = Math.floor(frameHeight / 2); //3 spaces on top of hero
  const cellHeight = pixelSize * 32;

  // character offset position to keep them centered
  const cameraOffset = cellHeight * cameraSpaceOnTop;

  const topPos = -(cellHeight * yPos);

  // nudges our main character up half a cell
  return topPos + cellHeight * 0.5 + cameraOffset;
};

const WorldBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: background 0.2s ease 0s;
  background: pink;
`;

const World = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  position: relative;
  transition: 0.6s linear;
`;

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0);
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  position: relative;
  height: ${props => `${32 * props.pixelSize * 7}px`};
  width: ${props => `${32 * props.pixelSize * 7}px`};
`;

export default App;
