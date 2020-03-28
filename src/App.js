import React, { useState, useEffect } from "react";
import "./global.css";
import styled from "styled-components";

// {
//   "mapTransition": null,
//   "handleMapTransitionOut": "ƒ () {}",
//   "mapData": {
//     "playerX": 2,
//     "playerY": 4,
//     "height": 9,
//     "width": 7,
//     "mapBackgroundColor": "#b2ddd0",
//     "mapSong": "",
//     "image": "/images/maps/masters/jrq/jrq-apartment.png",
//     "walls": [
//       "2x6",
//       "4x6",
//       "5x5",
//       "5x4",
//       "4x3",
//       "3x2",
//       "2x3",
//       "1x4",
//       "1x5",
//       "4x5",
//       "3x8",
//       "2x7",
//       "4x7"
//     ],
//     "interactives": [
//       "{battleCrewSlot: 1, class: \"lead\", currentActionTyp…}"
//     ],
//     "interactiveActions": {
//       "interactive_CtnoKpC3zIWBaj7": "[{…}]"
//     },
//     "triggers": [
//       "{bypassOnStoryPoints: Array(1), id: \"cutscene_hs8lH…}",
//       "{bypassOnStoryPoints: Array(1), id: \"cutscene_2Dq2G…}",
//       "{id: \"transition_5PTjAl7XjQd2Epz\", interaction: Arr…}"
//     ],
//     "addExplodingSpaceAtHeroPosition": false
//   },
//   "pixelSize": 3,
//   "globalCutsceneEvents": [],
//   "handleSingleCutsceneEventCompleted": "ƒ () {}",
//   "handleProvideNewCutsceneEvents": "ƒ () {}",
//   "directionArrows": [],
//   "actionKeyFireCache": 5,
//   "pauseKeyFireCache": 0,
//   "refreshPeopleList": null,
//   "storyPointTrigger": 2,
//   "acquiredStoryPoints": [
//     "SP_JRQ_BeginOnboarding",
//     "SP_JRQ_OnboardingStep2",
//     "SP_JRQ_OnboardingJacobCorner",
//     "SP_JRQ_JacobTextMessage",
//     "SP_JRQ_GotJacobQuest",
//     "SP_JRQ_GotApartmentLaptop",
//     "pickup_outsideApartment_6Eq7kOFPnX"
//   ]
// }

const map = {};
const playerData = {};
const global = {};

const App = () => {
  return (
    <div className="App">
      <Map>
        <Person x={1} y={1}></Person>
      </Map>
    </div>
  );
};

const Map = ({ x, y, children }) => {
  return <MapContainer>{children}</MapContainer>;
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

  getLeftPosition(1);
  getTopPosition(1);

  return (
    <PersonContainer
      style={{ left: getLeftPosition(xPos), top: getTopPosition(yPos) }}
    ></PersonContainer>
  );
};

const getLeftPosition = xPos => {
  // console.log(window.outerWidth);
  const leftPos = ((96 * (96 * 5)) / window.outerWidth) * xPos;
  // console.log(leftPos);

  return leftPos;
};

const getTopPosition = yPos => {
  // console.log(window.outerHeight);
  const topPos = ((96 * (96 * 5)) / window.outerHeight) * yPos;
  // console.log(topPos);

  return topPos;
};

const ViewPortContainer = styled.div``;

const PersonContainer = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background: pink;
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
