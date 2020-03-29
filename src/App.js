import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./global.css";
import styled from "styled-components";

const world = {
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
// const playerData = {};
// const game = {};

const renderGridCells = numCells => {
  console.log(numCells);
  let i = 0;

  let cells = [];

  for (; i < numCells; i++) {
    cells.push(<div key={`grid-cell-${i}`}></div>);
  }

  console.log(cells.length);
  return cells;
};

const App = () => {
  return (
    //     width: 100vw;
    // height: 100vh;
    // overflow: hidden;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // background: rgb(0, 0, 0);
    <MainContainer
      style={{
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Main>
        <WorldBackground></WorldBackground>
        <World>
          <Map x={8} y={4}>
            <Grid>
              {renderGridCells(world.mapData.width * world.mapData.height)}
            </Grid>
          </Map>
          <Person x={8} y={4}></Person>
        </World>
      </Main>
    </MainContainer>
  );
};

const Map = ({ x, y, children }) => {
  const [xPos, setXPos] = useState(x);
  const [yPos, setYPos] = useState(y);

  const keyedUp = useKeyPress("ArrowUp");
  const keyedLeft = useKeyPress("ArrowLeft");
  const keyedDown = useKeyPress("ArrowDown");
  const keyedRight = useKeyPress("ArrowRight");

  const canvas = useRef(null);

  useLayoutEffect(() => {
    const ctx = canvas.current.getContext("2d");

    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };

    image.src = "./images/maps/jrq-outside-apartment.png";
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
  return (
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
  );
};

const Person = ({ x, y }) => {
  // const [xPos, setXPos] = useState(x);
  // const [yPos, setYPos] = useState(y);

  // const keyedUp = useKeyPress("ArrowUp");
  // const keyedLeft = useKeyPress("ArrowLeft");
  // const keyedDown = useKeyPress("ArrowDown");
  // const keyedRight = useKeyPress("ArrowRight");

  const canvas = useRef(null);

  useLayoutEffect(() => {
    const ctx = canvas.current.getContext("2d");

    const image = new Image();

    image.onload = () => {
      ctx.drawImage(image, 0, 0, 128, 128);
    };

    image.src = "./images/skins/people/ZAK-SHEET.png";
  });

  // useEffect(() => {
  //   if (keyedUp) {
  //     setYPos(prevValue => {
  //       return prevValue - 1;
  //     });
  //   }

  //   if (keyedDown) {
  //     setYPos(prevValue => {
  //       return prevValue + 1;
  //     });
  //   }

  //   if (keyedLeft) {
  //     setXPos(prevValue => {
  //       return prevValue - 1;
  //     });
  //   }

  //   if (keyedRight) {
  //     setXPos(prevValue => {
  //       return prevValue + 1;
  //     });
  //   }
  // }, [keyedDown, keyedUp, keyedLeft, keyedRight]);

  // useEffect(() => {
  //   getLeftPosition(1);
  //   getTopPosition(1);
  // }, []);

  return (
    <PersonContainer
    // style={{ left: getLeftPosition(xPos), top: getTopPosition(yPos) }}
    >
      {/* {`x: ${xPos}`}
      <br />
      {`y: ${yPos}`} */}
      <PersonCrop>
        <canvas
          id="playerCanvas"
          ref={canvas}
          width={128}
          height={128}
          style={{ width: "512px", transform: "translate3d(0px, 0px, 0px)" }}
          // width: 384px; transform: translate3d(0px, 0px, 0px); animation: 0s ease 0s 1 normal none running none;
        ></canvas>
      </PersonCrop>
    </PersonContainer>
  );
};

const getLeftPosition = xPos => {
  const gridWidth = world.mapData.mapStyleWidth;
  const cellsAcross = world.mapData.width;
  const cellWidth = gridWidth / cellsAcross;

  const leftPos = -(cellWidth * xPos);

  console.log(leftPos);

  return leftPos + 128;
};

const getTopPosition = yPos => {
  const gridHeight = world.mapData.mapStyleHeight;
  const cellsDown = world.mapData.height;
  const cellHeight = -(gridHeight / cellsDown);

  const topPos = cellHeight * yPos;

  console.log(topPos);

  return topPos + 64;
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
  overflow: hidden;
  background: rgb(0, 0, 0);
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
