import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "../../types/Videos";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";
import {
  useGetVideoQuery,
  initialState,
  useUpdateVideoMutation,
  useGetAllCategoriesQuery,
  useGetAllGenresQuery,
  useGetAllCastMembersQuery,
} from "./VideoSlice";

export function VideosEdit() {
  const id = useParams<{ id: string }>().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const { data: video, isFetching } = useGetVideoQuery({ id });
  const [videoState, setVideoState] = useState<Video>(initialState);
  const [updateVideo, status] = useUpdateVideoMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: castMembers } = useGetAllCastMembersQuery();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setVideoState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateVideo(mapVideoToForm(videoState));
  }

  useEffect(() => {
    if (video) {
      setVideoState(video.data);
    }
  }, [video]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Video updated`, { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar(`Error updating Video`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Video</Typography>
          </Box>
        </Box>

        <VideosForm
          video={videoState}
          isLoading={isFetching}
          isDisabled={isFetching}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          categories={categories?.data}
          genres={genres?.data}
          castMembers={castMembers?.data}
        />
      </Paper>
    </Box>
  );
}
