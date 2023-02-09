import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from "@mui/material";
import { CastMember } from "../types/CastMembers";
import { Category } from "../types/Category";
import { Genre } from "../types/Genres";

type Props = {
  name: string;
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
  values?: (Genre | Category | CastMember)[];
  options?: (Genre | Category | CastMember)[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AutoCompleteFields = ({
  name,
  label,
  values,
  options,
  isLoading,
  isDisabled,
  handleChange,
}: Props) => {
  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Category | Genre | CastMember
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

  const isEqualId = (
    option: Genre | Category | CastMember,
    value: Genre | Category | CastMember
  ) => {
    return option.id === value.id;
  };

  const handleOnChange = (
    _e: React.ChangeEvent<{}>,
    newValue: (Genre | Category | CastMember)[]
  ) => {
    handleChange({ target: { name, value: newValue } } as any);
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} />
  );

  return (
    <Autocomplete
      multiple
      value={values}
      options={options || []}
      loading={isLoading}
      onChange={handleOnChange}
      renderInput={renderInput}
      data-testid={`${name}-search`}
      renderOption={renderOptions}
      isOptionEqualToValue={isEqualId}
      disabled={isDisabled || !options}
      getOptionLabel={(option) => option.name}
    />
  );
};
