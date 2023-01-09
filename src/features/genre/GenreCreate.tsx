import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Genre } from "../../types/Genres";
import { GenreForm } from "./components/GenreFrom";
import {
  initialState as genreInintalState,
  useCreateGenreMutation,
  useGetCaTegoriesQuery,
} from "./genreSlice";
import { mapGenreToForm } from "./util";

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCaTegoriesQuery();
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInintalState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createGenre(mapGenreToForm(genreState));
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre created`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Genre not created`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          categories={categories?.data}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
