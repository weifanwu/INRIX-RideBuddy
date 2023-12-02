import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("weifan");
  useEffect(async () => {
    setUserName(
      "weifan wu"
    );
  }, []);
  return (
    <Container>
      <img src="/" alt="" />
      <h1>
        Welcome, <span>weifan!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
