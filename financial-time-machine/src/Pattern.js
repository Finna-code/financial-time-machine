import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 0;

  .container {
    width: 100%;
    height: 100%;
    background-image: conic-gradient(from 180deg at center, orange, orangered, orange);
    background-size: cover;
    background-repeat: no-repeat;
    background-color: orange;
    opacity: 0.9; /* Slightly see-through to prevent overwhelming UI */
  }
`;

export default Pattern;
