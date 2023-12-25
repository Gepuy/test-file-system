import { IItem, ISearchResult } from "../types/models";
import { EItemType } from "../types";

export const searchItemByName = (
  data: ReadonlyArray<IItem>,
  name: string,
  isAccessLevelEnabled: boolean
): ReadonlyArray<ISearchResult> => {
  const results: Array<ISearchResult> = [];

  function dfsSearch(node: IItem, path: ReadonlyArray<string>) {
    const currentPath = [...path, node.id];

    if (
      node.name.toLowerCase().includes(name.toLowerCase()) &&
      (isAccessLevelEnabled ? node.userHasAccess : true)
    ) {
      results.push({ item: node, path: currentPath });
    }

    if (node.type === EItemType.FOLDER && node.children) {
      node.children.forEach((child) => {
        dfsSearch(child, currentPath);
      });
    }
  }

  data.forEach((item) => {
    dfsSearch(item, []);
  });

  return results;
};
