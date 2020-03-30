import React from "react";

import { Grid } from "./styles";

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

export default MapGrid;
