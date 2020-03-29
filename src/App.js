import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./global.css";
import styled from "styled-components";

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

const MapGrid = ({ mapWidth, mapHeight }) => {
  const totalCells = mapWidth * mapHeight;

  const renderGridCells = (mapWidth, mapHeight) => {
    let i = 0;
    let j = 0;
    let cells = [];

    for (; i < mapHeight; i++) {
      for (; j < mapWidth; j++) {
        cells.push(<div key={`grid-cell-${j}x${i}`}>{`${j} x ${i}`}</div>);
      }
      j = 0;
    }
    console.log(cells.length, totalCells);
    return cells;
  };

  return <Grid>{renderGridCells(mapWidth, mapHeight)}</Grid>;
};

const App = () => {
  return (
    <MainContainer>
      <Main>
        <WorldBackground></WorldBackground>
        <World>
          <Map x={11} y={7} mapSrc="jrq-outside-apartment.png">
            <MapGrid
              mapWidth={worldData.mapData.width}
              mapHeight={worldData.mapData.height}
            ></MapGrid>
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

  const walls = [[]];

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
      setYPos(prevValue => {
        return prevValue - 1;
      });
    }

    if (keyedDown) {
      setYPos(prevValue => {
        return prevValue + 1;
      });
    }

    if (keyedLeft) {
      setXPos(prevValue => {
        return prevValue - 1;
      });
    }

    if (keyedRight) {
      setXPos(prevValue => {
        return prevValue + 1;
      });
    }
  }, [keyedDown, keyedUp, keyedLeft, keyedRight]);

  useEffect(() => {
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
        message={`I'm on cell ${currentCoord}`}
        skinSrc="ZAK-SHEET.png"
      ></Person>
    </>
  );
};

const Person = ({ skinSrc, message }) => {
  const canvas = useRef(null);

  const skinBasePath = "./images/skins/people/";

  useLayoutEffect(() => {
    const ctx = canvas.current.getContext("2d");

    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };

    image.src = `${skinBasePath}${skinSrc}`;
  });

  return (
    <PersonContainer>
      <SpeechBubble>{message}</SpeechBubble>
      <PersonCrop>
        <canvas
          id="playerCanvas"
          ref={canvas}
          width={128}
          height={128}
          style={{ width: "512px", transform: "translate3d(0px, 0px, 0px)" }}
        ></canvas>
      </PersonCrop>
    </PersonContainer>
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

const PersonContainer = styled.div`
  opacity: 1;
  transition: opacity 0.3s ease 0s;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 128px;
  height: 128px;
  transform: translate3d(384px, 384px, 0px);
`;

const SpeechBubble = styled.div`
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

const PersonCrop = styled.div`
  height: 128px;
  width: 128px;
  overflow: hidden;
  position: relative;
`;

const WorldBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transition: background 0.2s ease 0s;
  background: rgb(161, 242, 162);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(22, 1fr);
  grid-template-rows: repeat(14, 1fr);
  height: 1792px;
  width: 2816px;
  position: absolute;
  top: 0;
  left: 0;
  div {
    border: 1px dashed black;
    border-width: 0 1px 1px 0;
    display: flex; /* flex styling to center content in divs */
    align-items: center;
    justify-content: center;
  }
`;

// useKeypress Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export default App;
