import styled from "styled-components";

export const Grid = styled.div`
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
