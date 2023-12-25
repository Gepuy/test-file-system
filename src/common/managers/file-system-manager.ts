import { IItem } from "../types/models";
import { httpService } from "../services";

export const getFileSystemData = async (): Promise<ReadonlyArray<IItem>> => {
  const path = "data";

  return httpService.get(path);
};
