import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Genre } from "../../types/Genres";
import { GenreForm } from "./components/GenreFrom";
import {
  useGetCaTegoriesQuery,
  initialState as genreInintalState,
  useGetGenreQuery,
  useUpdateGenreMutation,
} from "./genreSlice";
import { mapGenreToForm } from "./util";

export const GenreEdit = () => {
  const id = useParams<{ id: string }>().id as string;
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCaTegoriesQuery();
  const [updateGenre, status] = useUpdateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInintalState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setGenreState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateGenre(mapGenreToForm(genreState));
  }

  useEffect(() => {
    if (genre) {
      setGenreState(genre.data);
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Genre updated`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error updating genre`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          categories={categories?.data}
          isDisabled={isFetching || status.isLoading}
          isLoading={status.isLoading || isFetching}
        />
      </Paper>
    </Box>
  );
};
