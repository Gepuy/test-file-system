import React, { SyntheticEvent } from "react";
import { IItem } from "../../types/models";
import { TreeView as MUITreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getItemLabel } from "../../helpers";
import styled from "styled-components";
import { useFilesContext } from "../../../contexts";

type ThreeViewProps = {
  readonly data: ReadonlyArray<IItem>;
};

export const ThreeView = ({ data }: ThreeViewProps) => {
  const { isAccessLevelEnabled, setSelectedNodeId, selectedNodeId, expandedIds, setExpandedIds } =
    useFilesContext();

  const renderTree = (items: ReadonlyArray<IItem> | undefined) => {
    if (!items) return null;

    return items.map((item) => (
      <StyledTreeItem
        key={item.id}
        nodeId={item.id}
        label={getItemLabel(item.name, item.extension)}
        disabled={isAccessLevelEnabled && !item.userHasAccess}
      >
        {renderTree(item.children)}
      </StyledTreeItem>
    ));
  };

  const onSelectItem = (_event: SyntheticEvent, nodeId: string | string[]) => {
    setSelectedNodeId(nodeId as string);
  };

  const onNodeToggle = (_event: SyntheticEvent, nodeIds: Array<string>) => {
    setExpandedIds(nodeIds);
  };

  return (
    <StyledThreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selectedNodeId}
      onNodeSelect={onSelectItem}
      onNodeToggle={onNodeToggle}
      expanded={expandedIds}
    >
      {data.map((el) => (
        <StyledTreeItem
          disabled={isAccessLevelEnabled && !el.userHasAccess}
          key={el.id}
          nodeId={el.id}
          label={el.name}
        >
          {renderTree(el.children)}
        </StyledTreeItem>
      ))}
    </StyledThreeView>
  );
};

const StyledThreeView = styled(MUITreeView)`
  color: #f1f1f1f1;
  .MuiThreeView-root {
    margin-top: 10px;
  }
`;

const StyledTreeItem = styled(TreeItem)`
  & .Mui-selected {
    backdrop-filter: brightness(0.9);
  }
`;
