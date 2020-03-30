import React, { useLayoutEffect, useEffect, useRef, useState } from "react";

import {
  PersonContainer,
  PersonCrop,
  SpeechBubble,
  SpriteCanvas,
  WalkAnimation,
  StandAnimation
} from "./styles";

const directionsMap = {
  DOWN: 0,
  RIGHT: `${-32 * 4}px`,
  UP: `${-64 * 4}px`,
  LEFT: `${-96 * 4}px`
};

const walk = (startWalk, endWalk) => {
  let steps = 36;
  startWalk();

  const step = () => {
    requestAnimationFrame(() => {
      if (steps > 0) {
        steps -= 1;
        step();
      } else {
        endWalk();
      }
    });
  };

  step();
};

const Person = ({ skinSrc, message, direction, coord }) => {
  const [currentDirection, setCurrentDirection] = useState(directionsMap.DOWN);
  const [currentBehavior, setCurrentBehavior] = useState(StandAnimation);
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

  useEffect(() => {
    setCurrentDirection(direction);
  }, [direction]);

  useEffect(() => {
    walk(
      () => setCurrentBehavior(WalkAnimation),
      () => setCurrentBehavior(StandAnimation)
    );
  }, [coord]);

  return (
    <PersonContainer>
      {message && <SpeechBubble>{message}</SpeechBubble>}
      <PersonCrop>
        <SpriteCanvas
          id="playerCanvas"
          ref={canvas}
          width={128}
          height={128}
          direction={directionsMap[currentDirection]}
          behavior={currentBehavior}
        ></SpriteCanvas>
      </PersonCrop>
    </PersonContainer>
  );
};

export default Person;
