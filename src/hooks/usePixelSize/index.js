/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const getPixelSize = (windowWidth, windowHeight) => {
  const cellSize = 32;
  const rowInCells = 7 + 0.5;
  const columnInCells = 7 + 0.5;

  const firstValidPixelSize = [4, 3, 2, 1].find(pixelSize => {
    const totalPixelRowSize = pixelSize * cellSize * rowInCells;
    const totalPixelColumnSize = pixelSize * cellSize * columnInCells;

    return (
      windowWidth >= totalPixelRowSize && windowHeight >= totalPixelColumnSize
    );
  });

  return firstValidPixelSize || 1;
};

const getWidth = () => {
  return window.innerWidth;
};

const getHeight = () => {
  return window.innerHeight;
};

function usePixelSize() {
  let [pixelSize, setPixelSize] = useState(
    getPixelSize(getWidth(), getHeight())
  );

  let timeoutId = null;

  const resizeListener = () => {
    // prevent execution of previous setTimeout
    clearTimeout(timeoutId);

    // debounce listener 150 milliseconds
    timeoutId = setTimeout(() => {
      setPixelSize(getPixelSize(getWidth(), getHeight()));
    }, 150);
  };

  useEffect(() => {
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return pixelSize;
}

export default usePixelSize;
