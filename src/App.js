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
const playerData = {};
const game = {};

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
    <div className="App">
      <World>
        <Map x={8} y={4}>
          <Grid>
            {renderGridCells(world.mapData.width * world.mapData.height)}
          </Grid>
        </Map>
        <Person x={8} y={4}></Person>
      </World>
    </div>
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
      ctx.drawImage(image, 0, 0, 704, 448);
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
        transform: `translate3d(-${getLeftPosition(xPos)}px, -${getTopPosition(
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
  const [xPos, setXPos] = useState(x);
  const [yPos, setYPos] = useState(y);

  const keyedUp = useKeyPress("ArrowUp");
  const keyedLeft = useKeyPress("ArrowLeft");
  const keyedDown = useKeyPress("ArrowDown");
  const keyedRight = useKeyPress("ArrowRight");

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
    getLeftPosition(1);
    getTopPosition(1);
  }, []);

  // {
  //   "pixelSize": 3,
  //   "cellSize": 96,
  //   "skinId": "zak",
  //   "transformValue": "translate3d(288px, 288px, 0)",
  //   "direction": "RIGHT",
  //   "movingProgress": 0,
  //   "currentActionType": "characterStand",
  //   "hasBattleLaptop": false,
  //   "isDialogBoxUp": false
  // }

  // {
  //   "interactives": [
  //     {
  //       "skinId": "zak",
  //       "id": "hero",
  //       "name": "Los",
  //       "class": "lead",
  //       "battleCrewSlot": 1,
  //       "hp": 32,
  //       "isAlwaysInBattleCrew": true,
  //       "equippedAttacks": {
  //         "slot1": "script_slice",
  //         "slot2": "script_curl",
  //         "slot3": null,
  //         "slot4": null,
  //         "slotSuper": null
  //       },
  //       "customMovingSpeed": 1.45454545455,
  //       "isArrowControlled": true,
  //       "x": 2,
  //       "y": 5,
  //       "direction": "LEFT",
  //       "currentActionType": "characterStand",
  //       "hasQuestIndicator": false,
  //       "isHostile": false,
  //       "hasBattleLaptop": false,
  //       "doThisBehavior": null,
  //       "currentlyExecutingBehavior": null,
  //       "movingProgress": 0,
  //       "isInternalEventFinished": true
  //     }
  //   ]
  // }

  return (
    <PersonContainer
    // style={{ left: getLeftPosition(xPos), top: getTopPosition(yPos) }}
    >
      {`x: ${xPos}`}
      <br />
      {`y: ${yPos}`}
    </PersonContainer>
  );
};

const getLeftPosition = xPos => {
  const gridWidth = world.mapData.mapStyleWidth;
  const cellsAcross = world.mapData.width;
  const cellWidth = gridWidth / cellsAcross;

  const leftPos = cellWidth * xPos;

  return leftPos;
};

const getTopPosition = yPos => {
  const gridHeight = world.mapData.mapStyleHeight;
  const cellsDown = world.mapData.height;
  const cellHeight = gridHeight / cellsDown;

  const topPos = cellHeight * yPos;

  return topPos;
};

const ViewPortContainer = styled.div``;

const PersonContainer = styled.div`
  width: 128px;
  height: 128px;
  background: red;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(384px, 384px, 0);
`;

const World = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  height: 1792px;
  width: 2816px;
  /* background: url("./images/maps/jrq-outside-apartment.png") top left / cover */
  /* no-repeat border-box pink; */
  position: relative;
  /* background: pink; */
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

// Hook
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

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

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export default App;
