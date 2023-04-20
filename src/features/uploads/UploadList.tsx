import CloseIcon from "@mui/icons-material/Close";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UploadItem } from "./components/UploadItem";
import {
  cleanAllUploads,
  cleanFinishedUploads,
  selectUploads,
} from "./UploadSlice";
import { useState } from "react";

type Upload = {
  name: string;
  progress: number;
};

type Props = {
  uploads?: Upload[];
};

export const UploadList: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const uploadList = useAppSelector(selectUploads);
  const dispatch = useAppDispatch();

  if (!uploadList || uploadList.length === 0) {
    return null;
  }

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cleanFinishedUploads());
  };

  const handleCancelAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(cleanAllUploads());
  };

  return (
    <Box
      right={0}
      bottom={0}
      zIndex={9}
      width={"100%"}
      position={"fixed"}
      sx={{ "@media (min-width: 600px)": { width: 450 } }}
    >
      <Accordion
        expanded={expanded === "upload"}
        onChange={(event, isExpanded) => {
          setExpanded(isExpanded ? "upload" : false);
        }}
      >
        <AccordionSummary
          sx={{ backgroundColor: "grey.800" }}
          aria-controls="upload-content"
        >
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>
              Uploading {uploadList.length}{" "}
              {uploadList.length > 1 ? "files" : "file"}
            </Typography>

            <Box display={"flex"} alignItems={"flex-end"}>
              <IconButton onClick={handleOnClose}>
                <DeleteSweepIcon />
              </IconButton>

              <IconButton onClick={handleCancelAll}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ width: "100%", maxHeight: 300, overflow: "auto" }}>
            {uploadList.map((upload, index) => (
              <Box key={index}>
                <UploadItem upload={upload} />
              </Box>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
