import React, { SyntheticEvent, useCallback, useState } from "react";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";
import styled from "styled-components";
import { IItem, ISearchResult } from "../../types/models";
import { searchItemByName } from "../../helpers";
import debounce from "debounce";

type SearchBarProps = {
  readonly data: ReadonlyArray<IItem>;
  readonly setSelectedNodeId: (value: string) => void;
  readonly isAccessLevelEnabled: boolean;
  readonly setExpandedIds: (ids: Array<string>) => void;
};

export const SearchBar = ({
  data,
  setSelectedNodeId,
  isAccessLevelEnabled,
  setExpandedIds,
}: SearchBarProps) => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<ReadonlyArray<ISearchResult>>([]);

  const renderInput = (params: AutocompleteRenderInputParams) => {
    return <StyledTextField {...params} label='Search file' type='text' />;
  };

  const debouncedSetOptions = useCallback(
    debounce((searchResult: ReadonlyArray<ISearchResult>) => {
      setOptions(searchResult);
      if (searchResult.length) {
        setExpandedIds(searchResult[0].path);
      }
    }, 500),
    [setExpandedIds]
  );

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const searchResult = searchItemByName(data, value, isAccessLevelEnabled);
      debouncedSetOptions(searchResult);
    }, 500),
    [data, isAccessLevelEnabled, debouncedSetOptions]
  );

  const handleInputChange = (event: SyntheticEvent, value: string) => {
    setValue(value);
    debouncedSearch(value);
  };

  const onValueChange = (_: SyntheticEvent, value: ISearchResult | null) => {
    if (!value) return;
    setSelectedNodeId(value.item.id);
  };

  return (
    <StyledAutocomplete
      disablePortal
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-expect-error
      onChange={onValueChange}
      id='combo-box'
      options={options}
      renderInput={renderInput}
      inputValue={value}
      onInputChange={handleInputChange}
      getOptionLabel={(option) => (option as ISearchResult).item.name}
    />
  );
};

const StyledAutocomplete = styled(Autocomplete)`
  align-self: center;
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    width: 300px;
    margin-bottom: 20px;
    color: #f1f1f1;
    border-color: #919191;
  }

  & label.Mui-focused, & label.Mui-focused {
    color: white
  }
    
  & .MuiInput-underline:after {
      border-bottom-color: white;
  }
    
  & .MuiOutlinedInput-root {
    & .MuiSvgIcon-root {
        color: white
    }
    & fieldset {
        border-color: white
    }
        
    &:hover fieldset {
      border-color: white
    }
        
    &.Mui-focused fieldset {
      border-color: white
    },
  },
`;
