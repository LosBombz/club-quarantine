import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

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
  return (
    <MainContainer>
      <Main>
        <WorldBackground></WorldBackground>
        <World>
          <Map x={11} y={7} mapSrc="jrq-outside-apartment.png">
            {/* <MapGrid
              mapWidth={worldData.mapData.width}
              mapHeight={worldData.mapData.height}
            ></MapGrid> */}
          </Map>
        </World>
      </Main>
    </MainContainer>
  );
};

const Map = ({ x, y, mapSrc, children }) => {
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
          console.log(`wall at ${xPos}x${prevValue - 1}`);
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
          console.log(`wall at ${xPos}x${prevValue + 1}`);
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
          console.log(`wall at ${prevValue - 1}x${yPos}`);
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
          transform: `translate3d(${getLeftPosition(xPos)}px, ${getTopPosition(
            yPos
          )}px, 0)`
        }}
      >
        <canvas
          id="mapCanvas"
          ref={canvas}
          width={704}
          height={448}
          style={{ height: "1792px", width: "2816px" }}
        ></canvas>
        {children}
      </MapContainer>
      <Person
        message={message}
        direction={currentDirection}
        skinSrc="ZAK-SHEET.png"
        coord={currentCoord}
      ></Person>
    </>
  );
};

const getLeftPosition = xPos => {
  const gridWidth = worldData.mapData.mapStyleWidth;
  const cellsAcross = worldData.mapData.width;
  const cellWidth = gridWidth / cellsAcross;

  // 384 is an offset of 3 cells to 0 out the coordinate system
  const leftPos = -(cellWidth * xPos) + 384;

  return leftPos;
};

const getTopPosition = yPos => {
  const gridHeight = worldData.mapData.mapStyleHeight;
  const cellsDown = worldData.mapData.height;
  const cellHeight = gridHeight / cellsDown;

  // 384 is an offset of 3 cells to 0 out the coordinate system
  const topPos = -(cellHeight * yPos) + 384;

  // nudges our main character up half a cell
  return topPos + 64;
  // return topPos;
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
  height: 1792px;
  width: 2816px;
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
  width: 896px;
  height: 896px;
`;

export default App;
