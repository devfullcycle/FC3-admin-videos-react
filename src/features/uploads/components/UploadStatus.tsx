import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CircularProgress } from "@mui/material";
import { STATUS, Status } from "../UploadSlice";

interface Props {
  status?: Status;
  progress?: number;
}

export const UploadStatus: React.FC<Props> = ({ status, progress }) => {
  switch (status) {
    case STATUS.SUCCESS:
      return <CheckCircleOutlineIcon color="success" />;
    case STATUS.FAILED:
      return <ErrorOutlineIcon color="error" />;
    default:
      return (
        <CircularProgress
          variant="determinate"
          color="secondary"
          value={progress}
          size={20}
        />
      );
  }
};
