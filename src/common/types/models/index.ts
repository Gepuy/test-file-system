import { EItemType } from "../enums";

export interface IItem {
  readonly id: string;
  readonly name: string;
  readonly parentId?: string;
  readonly created_at: string;
  readonly type: EItemType;
  readonly children?: ReadonlyArray<IItem>;
  readonly extension?: string;
  readonly userHasAccess: boolean;
}

export interface ISearchResult {
  item: IItem;
  path: string[];
}
