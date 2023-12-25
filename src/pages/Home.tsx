import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThreeView } from "../common/components";
import { getFileSystemData } from "../common/managers";
import { useFilesContext } from "../contexts";
import { CircularProgress } from "@mui/material";
import { errorService } from "../common/services";
import { SearchBar } from "../common/components";
import { AccessSwitcher } from "../common/components";

const Home = () => {
  const { setItems, items, setSelectedNodeId, isAccessLevelEnabled, setExpandedIds } =
    useFilesContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    getFileSystemData()
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        errorService.handle(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <Sidebar>
        <SearchBar
          data={items}
          setSelectedNodeId={setSelectedNodeId}
          isAccessLevelEnabled={isAccessLevelEnabled}
          setExpandedIds={setExpandedIds}
        />
        <AccessSwitcher />
        {isLoading || !items.length ? <CircularProgress /> : <ThreeView data={items}></ThreeView>}
      </Sidebar>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  background: #191919;
  min-height: 100vh;
  width: 350px;
  padding-top: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
`;
