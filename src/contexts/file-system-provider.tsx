import React, {
  ChangeEvent,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { IItem } from "../common/types/models";

type FilesSystemContextType = {
  readonly items: ReadonlyArray<IItem>;
  readonly isAccessLevelEnabled: boolean;
  readonly selectedNodeId: string | null;
  readonly expandedIds: Array<string>;
  readonly setSelectedNodeId: (value: string) => void;
  readonly setItems: (items: ReadonlyArray<IItem>) => void;
  readonly setIsAccessLevelEnabled: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly setExpandedIds: (ids: Array<string>) => void;
};

export const FilesContext = createContext<FilesSystemContextType>({
  items: [],
  setItems: () => {},
  isAccessLevelEnabled: false,
  setIsAccessLevelEnabled: () => {},
  selectedNodeId: null,
  setSelectedNodeId: () => {},
  expandedIds: [],
  setExpandedIds: () => {},
});

const FilesSystemContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<ReadonlyArray<IItem>>([]);
  const [isAccessLevelEnabled, setIsAccessLevelEnabled] = useState<boolean>(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Array<string>>([]);

  const setFileSystem = (items: ReadonlyArray<IItem>) => setItems(items);

  const setAccessLevelEnabled = (event: ChangeEvent<HTMLInputElement>) =>
    setIsAccessLevelEnabled(event.target.checked);

  const selectNodeId = (value: string) => {
    setSelectedNodeId(value);
  };

  const setExpandedItemsIds = (ids: Array<string>) => {
    setExpandedIds(ids);
  };

  const contextValue = useMemo(
    () => ({
      items,
      setItems: setFileSystem,
      isAccessLevelEnabled,
      setIsAccessLevelEnabled: setAccessLevelEnabled,
      selectedNodeId,
      setSelectedNodeId: selectNodeId,
      expandedIds,
      setExpandedIds: setExpandedItemsIds,
    }),
    [items, isAccessLevelEnabled, selectedNodeId, expandedIds]
  );

  return <FilesContext.Provider value={contextValue}>{children}</FilesContext.Provider>;
};

export default FilesSystemContextProvider;

export const useFilesContext = () => {
  return useContext(FilesContext);
};
