const initialState = {};

const playerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "playerTest": {
      return Object.assign({}, state);
    }
    default:
      return state;
  }
};

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

export default playerDataReducer;
