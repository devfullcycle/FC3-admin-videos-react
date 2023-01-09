import { useEffect, useState } from "react";
import { CastMember } from "../../types/CastMembers";
import {
  initialState,
  useGetCastMemberQuery,
  useUpdateCastMemberMutation,
} from "./castMembersSlice";
import { useSnackbar } from "notistack";
import { Box } from "@mui/system";
import { Paper, Typography } from "@mui/material";
import { CastMemberForm } from "./components/CastMembersform";
import { useParams } from "react-router-dom";

export const EditCastMember = () => {
  const id = useParams().id ?? "";
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);

  const [updateCastMember, status] = useUpdateCastMemberMutation();

  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCastMember(castMemberState);
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar(`Cast member updated`, { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar(`Cast member not updated`, { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Cast member</Typography>
          </Box>
        </Box>
        <CastMemberForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          castMember={castMemberState}
          isLoading={isFetching || status.isLoading}
          isdisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
