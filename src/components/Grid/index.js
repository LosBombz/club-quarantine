import React from "react";

import { Grid } from "./styles";

const MapGrid = ({ mapWidth, mapHeight, pixelSize, show }) => {
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
    return cells;
  };

  return (
    <>
      {show && (
        <Grid pixelSize={pixelSize}>
          <h2
            style={{
              position: "absolute",
              top: -128,
              left: 0,
              background: "black",
              color: "white",
              padding: 10
            }}
          >{`pixel size: ${pixelSize} | Cell base size: 32 | Cell pixel size ${pixelSize *
            32} | Map cell dimensions ${mapWidth} x ${mapHeight} | Map pixel dimensions ${mapWidth *
            pixelSize *
            32} x ${mapHeight * pixelSize * 32}`}</h2>
          {renderGridCells(mapWidth, mapHeight)}
        </Grid>
      )}
    </>
  );
};

export default MapGrid;
