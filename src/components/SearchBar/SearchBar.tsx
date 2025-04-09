import React, { useMemo } from "react";
import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps extends Omit<TextFieldProps, "onChange"> {
  label: string;
  width?: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  width = "500px",
  label = "Buscar",
  value,
  ...props
}) => {
  const searchField = useMemo(
    () => (
      <TextField
        label={label}
        variant="outlined"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        {...props}
      />
    ),
    [value, onSearch, label]
  );

  return <div style={{ width, zIndex: 0 }}>{searchField}</div>;
};

export default SearchBar;
