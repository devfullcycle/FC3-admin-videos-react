import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { Link } from "react-router-dom";
import { Genre } from "../../../types/Genres";
import { Category } from "../../../types/Category";

type Props = {
  genre: Genre;
  categories?: Category[];
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function GenreForm({
  genre,
  categories,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange,
}: Props) {
  return (
    <Box p={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={genre.name}
                disabled={isDisabled}
                onChange={handleChange}
                inputProps={{ "data-testid": "name" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              data-testid="categories-search"
              loading={isLoading}
              options={categories || []}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={genre.categories}
              disabled={isDisabled || !categories}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              )}
              onChange={(e, newValue) => {
                handleChange({
                  target: { name: "categories", value: newValue },
                } as any);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Categories"
                  data-testid="categories-input"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/genres">
                Back
              </Button>

              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
