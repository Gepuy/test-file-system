import { IItem, ISearchResult } from "../../common/types/models";
import { EItemType } from "../../common/types";
import { searchItemByName } from "../../common/helpers";

const mockData: ReadonlyArray<IItem> = [
  {
    id: "1",
    name: "Folder 1",
    parentId: null,
    created_at: "2023-12-24T00:00:00Z",
    type: EItemType.FOLDER,
    userHasAccess: true,
    children: [
      {
        id: "2",
        name: "File 1",
        parentId: "1",
        created_at: "2023-12-25T00:00:00Z",
        type: EItemType.FILE,
        extension: ".txt",
        userHasAccess: true,
      },
    ],
  },
];

describe("searchItemByName function", () => {
  it("should return empty array if no match is found", () => {
    const results: ReadonlyArray<ISearchResult> = searchItemByName(mockData, "Nonexistent", true);
    expect(results).toHaveLength(0);
  });

  it("should return matching items when a valid name is provided", () => {
    const results: ReadonlyArray<ISearchResult> = searchItemByName(mockData, "File", true);

    expect(results).toHaveLength(1);
    expect(results[0].item.name).toEqual("File 1");
  });
});
