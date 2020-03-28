const initialState = {};

const worldReducer = (state = initialState, action) => {
  switch (action.type) {
    case "test": {
      return Object.assign({}, state);
    }
    default:
      return state;
  }
};

export default worldReducer;

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
