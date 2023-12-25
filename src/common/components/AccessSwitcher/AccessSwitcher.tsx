import React from "react";
import styled from "styled-components";
import { Switch } from "@mui/material";
import { useFilesContext } from "../../../contexts";

export const AccessSwitcher = () => {
  const { isAccessLevelEnabled, setIsAccessLevelEnabled } = useFilesContext();

  return (
    <Container>
      <p>Enable access levels: </p>
      <Switch
        defaultChecked={false}
        value={isAccessLevelEnabled}
        onChange={setIsAccessLevelEnabled}
        color='info'
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 10px;
`;
