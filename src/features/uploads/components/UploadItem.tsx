import ArticleIcon from "@mui/icons-material/Article";
import { Box, ListItem, Typography } from "@mui/material";
import { UploadState } from "../UploadSlice";
import { UploadStatus } from "./UploadStatus";

type Props = {
  upload: UploadState;
};

export const UploadItem: React.FC<Props> = ({ upload }) => {
  return (
    <ListItem>
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <ArticleIcon />
          <Typography maxWidth={280} noWrap>
            {upload.field}
          </Typography>
        </Box>
        <UploadStatus status={upload.status} progress={upload.progress} />
      </Box>
    </ListItem>
  );
};
